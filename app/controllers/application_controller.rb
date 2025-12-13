# frozen_string_literal: true

class ApplicationController < ActionController::API
  include JsonWebToken

  def current_user
    return if request.headers['Authorization'].blank?

    begin
      user_id = jwt_decode(request.headers['Authorization'].split.last)['user_id']
      @current_user ||= User.find(user_id)
    rescue JWT::ExpiredSignature
      nil
    rescue JWT::DecodeError
      nil
    rescue StandardError
      nil
    end
  end
end
