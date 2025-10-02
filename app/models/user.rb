# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string
#  first_name      :string           default(""), not null
#  last_name       :string           default(""), not null
#  name            :string
#  password_digest :string
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  has_many :projects, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true

  # Strong password validation
  validates :password,
    presence: true,
    length: { minimum: 8 },
    format: {
      with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+\z/,
      message: 'must include at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)'
    },
    if: :password_required?

  private

  def password_required?
    password_digest.nil? || password.present?
  end
end
