# frozen_string_literal: true

require 'json'
require 'fileutils'
require 'webpush'
require 'openssl'
require 'base64'

module PushNotifications
  class Config
    class MissingConfigurationError < StandardError; end

    class << self
      def public_key
        config.fetch('public_key')
      end

      def private_key
        config.fetch('private_key')
      end

      def subject
        config.fetch('subject')
      end

      def configured?
        public_key.present? && private_key.present? && subject.present?
      rescue MissingConfigurationError
        false
      end

      def reset!
        @config = nil
      end

      private

      def config
        @config ||= load_config
      end

      def load_config
        env_config = {
          'public_key' => ENV['VAPID_PUBLIC_KEY'],
          'private_key' => ENV['VAPID_PRIVATE_KEY'],
          'subject' => ENV['VAPID_SUBJECT']
        }

        return env_config if env_config.values.all?(&:present?)

        if Rails.env.production?
          raise MissingConfigurationError,
                'Missing VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, or VAPID_SUBJECT in production'
        end

        load_or_generate_local_config
      end

      def load_or_generate_local_config
        path = Rails.root.join('tmp', 'vapid_keys.json')
        return JSON.parse(File.read(path)) if File.exist?(path)

        FileUtils.mkdir_p(path.dirname)
        key_pair = generate_local_key_pair
        generated_config = {
          'public_key' => key_pair.public_key,
          'private_key' => key_pair.private_key,
          'subject' => 'mailto:dev@todo-app.local'
        }
        File.write(path, JSON.pretty_generate(generated_config))
        generated_config
      end

      def generate_local_key_pair
        ec_key = OpenSSL::PKey::EC.generate('prime256v1')

        Struct.new(:public_key, :private_key).new(
          Base64.urlsafe_encode64(ec_key.public_key.to_bn.to_s(2), padding: false),
          Base64.urlsafe_encode64(ec_key.private_key.to_s(2), padding: false)
        )
      end
    end
  end
end
