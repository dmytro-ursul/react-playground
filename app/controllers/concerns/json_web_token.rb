require 'jwt'
module JsonWebToken
  extend ActiveSupport::Concern
  SECRET_KEY = Rails.application.credentials.secret_key_base.to_s

  def jwt_encode(payload, exp = 240.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def jwt_decode(token)
    JWT.decode(token, SECRET_KEY)[0]
  end
end
