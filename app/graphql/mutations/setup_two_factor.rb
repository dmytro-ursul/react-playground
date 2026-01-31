# frozen_string_literal: true

module Mutations
  class SetupTwoFactor < BaseMutation
    description 'Initialize 2FA setup - generates secret and returns QR code data'

    field :secret, String, null: false
    field :provisioning_uri, String, null: false
    field :qr_code_svg, String, null: false

    def resolve
      user = context[:current_user]
      raise GraphQL::ExecutionError, 'Unauthorized' unless user

      # Generate new secret
      user.generate_otp_secret!

      # Generate QR code SVG
      qr_code = RQRCode::QRCode.new(user.otp_provisioning_uri)
      svg = qr_code.as_svg(
        color: '000',
        shape_rendering: 'crispEdges',
        module_size: 4,
        standalone: true,
        use_path: true
      )

      {
        secret: user.otp_secret,
        provisioning_uri: user.otp_provisioning_uri,
        qr_code_svg: svg
      }
    end
  end
end
