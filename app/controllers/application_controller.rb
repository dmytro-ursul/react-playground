# frozen_string_literal: true

class ApplicationController < ActionController::API
  include JsonWebToken

  def current_user
    return unless request.headers['Authorization'].present?

    user_id = jwt_decode(request.headers['Authorization'].split(' ').last)['user_id']
    @current_user ||= User.find(user_id)
  end
end
