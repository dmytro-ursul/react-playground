# frozen_string_literal: true

class ApplicationController < ActionController::API
  include JsonWebToken

  def current_user
    return if request.headers['Authorization'].blank?

    begin
      decoded = jwt_decode(request.headers['Authorization'].split.last)

      if decoded['session_id'].present?
        session = Session.find_by(id: decoded['session_id'])
        return nil unless session&.active?

        session.touch_last_active! if session.last_active_at < 5.minutes.ago
        @current_user ||= session.user
      else
        # Legacy token without session_id — allow until re-login
        @current_user ||= User.find(decoded['user_id'])
      end
    rescue JWT::ExpiredSignature
      nil
    rescue JWT::DecodeError
      nil
    rescue StandardError
      nil
    end
  end

  def current_session
    return if request.headers['Authorization'].blank?

    begin
      decoded = jwt_decode(request.headers['Authorization'].split.last)
      @current_session ||= Session.active.find_by(id: decoded['session_id'])
    rescue StandardError
      nil
    end
  end
end
