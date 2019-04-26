class User < ApplicationRecord
  has_secure_password
  validates :name, presence: true, length: { minimum: 2 }
  validates :contact, uniqueness: true, if: -> { contact.present? }
  validates :password, length: { in: 6..20 }
  validates :email, uniqueness: true, if: -> { email.present? }
  validates :email, presence: true, format: { with: /\A[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\z/, message: "format is not correct" }, if: -> { email.present? }

  PASSWORD_FORMAT = /\A
    (?=.{8,})          # Must contain 8 or more characters
    (?=.*\d)           # Must contain a digit
    (?=.*[a-z])        # Must contain a lower case character
    (?=.*[A-Z])        # Must contain an upper case character
    (?=.*[[:^alnum:]]) # Must contain a symbol
  /x

  validates :password,
    presence: true,
    length: { :within => 6..40 },
    format: { with: PASSWORD_FORMAT },
    confirmation: false,
    on: :create

  validates :password,
    allow_nil: true,
    length: { :within => 6..40 },
    format: { with: PASSWORD_FORMAT },
    confirmation: false,
    on: :update
end
