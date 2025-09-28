# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Allow Railway frontend and localhost for development
    origins [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      # Railway frontend URL will be added via environment variable
      ENV['FRONTEND_URL']
    ].compact
    resource '*',
      headers: :any,
      methods: %i[get post put patch delete options head],
      credentials: true
  end

  # Fallback for development - allow all origins in development only
  if Rails.env.development?
    allow do
      origins '*'
      resource '*', headers: :any, methods: %i[get post put patch delete options head]
    end
  end
end
