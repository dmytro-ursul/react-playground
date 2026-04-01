# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PushNotifications::Config do
  after { described_class.reset! }

  context 'when environment variables are set' do
    before do
      described_class.reset!
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with('VAPID_PUBLIC_KEY').and_return('env-public')
      allow(ENV).to receive(:[]).with('VAPID_PRIVATE_KEY').and_return('env-private')
      allow(ENV).to receive(:[]).with('VAPID_SUBJECT').and_return('mailto:test@example.com')
    end

    it 'returns the public key from ENV' do
      expect(described_class.public_key).to eq('env-public')
    end

    it 'returns the private key from ENV' do
      expect(described_class.private_key).to eq('env-private')
    end

    it 'returns the subject from ENV' do
      expect(described_class.subject).to eq('mailto:test@example.com')
    end

    it 'reports as configured' do
      expect(described_class.configured?).to be(true)
    end
  end

  context 'when environment variables are missing in development' do
    before do
      described_class.reset!
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with('VAPID_PUBLIC_KEY').and_return(nil)
      allow(ENV).to receive(:[]).with('VAPID_PRIVATE_KEY').and_return(nil)
      allow(ENV).to receive(:[]).with('VAPID_SUBJECT').and_return(nil)
      allow(Rails).to receive(:env).and_return(ActiveSupport::StringInquirer.new('development'))
    end

    it 'auto-generates keys and reports as configured' do
      expect(described_class.configured?).to be(true)
      expect(described_class.public_key).to be_present
      expect(described_class.private_key).to be_present
    end
  end
end
