# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Session mutations', type: :request do
  include JsonWebToken

  let!(:user) do
    User.create!(
      email: 'test@example.com',
      username: 'testuser',
      first_name: 'Test',
      last_name: 'User',
      password: 'Password1!'
    )
  end

  def execute_graphql(query, variables: {}, token: nil)
    headers = { 'Content-Type' => 'application/json' }
    headers['Authorization'] = "Bearer #{token}" if token
    post '/graphql', params: { query: query, variables: variables }.to_json, headers: headers
    JSON.parse(response.body)
  end

  describe 'signIn mutation' do
    let(:mutation) do
      <<~GQL
        mutation SignIn($username: String!, $password: String!) {
          signIn(input: { username: $username, password: $password }) {
            token
            requiresTwoFactor
            user { firstName lastName }
          }
        }
      GQL
    end

    it 'creates a session on successful login' do
      expect {
        execute_graphql(mutation, variables: { username: 'testuser', password: 'Password1!' })
      }.to change(Session, :count).by(1)

      session = Session.last
      expect(session.user).to eq(user)
      expect(session).to be_active
      expect(session.last_active_at).to be_within(1.second).of(Time.current)
    end

    it 'embeds session_id in the JWT token' do
      result = execute_graphql(mutation, variables: { username: 'testuser', password: 'Password1!' })
      token = result.dig('data', 'signIn', 'token')
      decoded = jwt_decode(token)

      expect(decoded['session_id']).to eq(Session.last.id)
      expect(decoded['user_id']).to eq(user.id)
    end

    it 'stores ip_address and user_agent' do
      headers = {
        'Content-Type' => 'application/json',
        'User-Agent' => 'TestBrowser/1.0'
      }
      post '/graphql',
           params: { query: mutation, variables: { username: 'testuser', password: 'Password1!' } }.to_json,
           headers: headers

      session = Session.last
      expect(session.ip_address).to be_present
      expect(session.user_agent).to eq('TestBrowser/1.0')
    end

    it 'does not create a session on failed login' do
      expect {
        execute_graphql(mutation, variables: { username: 'testuser', password: 'wrong' })
      }.not_to change(Session, :count)
    end
  end

  describe 'logout mutation' do
    let(:mutation) { 'mutation { logout(input: {}) { success } }' }

    it 'revokes the current session' do
      session = user.sessions.create!(ip_address: '1.2.3.4', user_agent: 'Test', last_active_at: Time.current)
      token = jwt_encode(user_id: user.id, session_id: session.id)

      result = execute_graphql(mutation, token: token)

      expect(result.dig('data', 'logout', 'success')).to be true
      expect(session.reload).not_to be_active
    end

    it 'returns error when not authenticated' do
      result = execute_graphql(mutation)
      expect(result['errors'].first['message']).to eq('Not authenticated')
    end
  end

  describe 'logoutAll mutation' do
    let(:mutation) { 'mutation { logoutAll(input: {}) { revokedCount } }' }

    it 'revokes all other sessions but keeps current' do
      current = user.sessions.create!(ip_address: '1.1.1.1', user_agent: 'Current', last_active_at: Time.current)
      other1 = user.sessions.create!(ip_address: '2.2.2.2', user_agent: 'Other1', last_active_at: Time.current)
      other2 = user.sessions.create!(ip_address: '3.3.3.3', user_agent: 'Other2', last_active_at: Time.current)
      token = jwt_encode(user_id: user.id, session_id: current.id)

      result = execute_graphql(mutation, token: token)

      expect(result.dig('data', 'logoutAll', 'revokedCount')).to eq(2)
      expect(current.reload).to be_active
      expect(other1.reload).not_to be_active
      expect(other2.reload).not_to be_active
    end
  end

  describe 'revokeSession mutation' do
    let(:mutation) do
      <<~GQL
        mutation RevokeSession($sessionId: ID!) {
          revokeSession(input: { sessionId: $sessionId }) { success }
        }
      GQL
    end

    it 'revokes a specific session' do
      current = user.sessions.create!(ip_address: '1.1.1.1', user_agent: 'Current', last_active_at: Time.current)
      target = user.sessions.create!(ip_address: '2.2.2.2', user_agent: 'Target', last_active_at: Time.current)
      token = jwt_encode(user_id: user.id, session_id: current.id)

      result = execute_graphql(mutation, variables: { sessionId: target.id.to_s }, token: token)

      expect(result.dig('data', 'revokeSession', 'success')).to be true
      expect(target.reload).not_to be_active
      expect(current.reload).to be_active
    end

    it 'cannot revoke another user session' do
      other_user = User.create!(email: 'other@example.com', username: 'other', password: 'Password1!')
      current = user.sessions.create!(ip_address: '1.1.1.1', user_agent: 'Current', last_active_at: Time.current)
      other_session = other_user.sessions.create!(ip_address: '2.2.2.2', user_agent: 'Other', last_active_at: Time.current)
      token = jwt_encode(user_id: user.id, session_id: current.id)

      result = execute_graphql(mutation, variables: { sessionId: other_session.id.to_s }, token: token)

      expect(result['errors'].first['message']).to eq('Session not found')
      expect(other_session.reload).to be_active
    end
  end

  describe 'activeSessions query' do
    let(:query) do
      <<~GQL
        query {
          activeSessions {
            id ipAddress userAgent lastActiveAt createdAt current
          }
        }
      GQL
    end

    it 'returns only active sessions for current user' do
      current = user.sessions.create!(ip_address: '1.1.1.1', user_agent: 'Current', last_active_at: Time.current)
      other = user.sessions.create!(ip_address: '2.2.2.2', user_agent: 'Other', last_active_at: 1.day.ago)
      revoked = user.sessions.create!(ip_address: '3.3.3.3', user_agent: 'Revoked', last_active_at: 2.days.ago)
      revoked.revoke!
      token = jwt_encode(user_id: user.id, session_id: current.id)

      result = execute_graphql(query, token: token)
      sessions = result.dig('data', 'activeSessions')

      expect(sessions.length).to eq(2)
      ids = sessions.map { |s| s['id'].to_i }
      expect(ids).to include(current.id, other.id)
      expect(ids).not_to include(revoked.id)
    end

    it 'marks the current session' do
      current = user.sessions.create!(ip_address: '1.1.1.1', user_agent: 'Current', last_active_at: Time.current)
      user.sessions.create!(ip_address: '2.2.2.2', user_agent: 'Other', last_active_at: Time.current)
      token = jwt_encode(user_id: user.id, session_id: current.id)

      result = execute_graphql(query, token: token)
      sessions = result.dig('data', 'activeSessions')
      current_session = sessions.find { |s| s['id'].to_i == current.id }
      other_session = sessions.find { |s| s['id'].to_i != current.id }

      expect(current_session['current']).to be true
      expect(other_session['current']).to be false
    end
  end

  describe 'session validation in ApplicationController' do
    let(:projects_query) { 'query { projects { id name } }' }

    it 'allows requests with a valid active session' do
      session = user.sessions.create!(ip_address: '1.1.1.1', user_agent: 'Test', last_active_at: Time.current)
      token = jwt_encode(user_id: user.id, session_id: session.id)

      result = execute_graphql(projects_query, token: token)
      expect(result['errors']).to be_nil
    end

    it 'rejects requests with a revoked session' do
      session = user.sessions.create!(ip_address: '1.1.1.1', user_agent: 'Test', last_active_at: Time.current)
      token = jwt_encode(user_id: user.id, session_id: session.id)
      session.revoke!

      result = execute_graphql(projects_query, token: token)
      expect(result['errors'].first['message']).to include('Unauthorized')
    end

    it 'allows legacy tokens without session_id' do
      token = jwt_encode(user_id: user.id)

      result = execute_graphql(projects_query, token: token)
      expect(result['errors']).to be_nil
    end

    it 'updates last_active_at on requests' do
      session = user.sessions.create!(ip_address: '1.1.1.1', user_agent: 'Test', last_active_at: 10.minutes.ago)
      token = jwt_encode(user_id: user.id, session_id: session.id)

      freeze_time do
        execute_graphql(projects_query, token: token)
        expect(session.reload.last_active_at).to be_within(1.second).of(Time.current)
      end
    end
  end
end
