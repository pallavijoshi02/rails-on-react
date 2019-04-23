class User < ApplicationRecord
  validates :name, presence: true, length: { minimum: 2 }
  validates :email, uniqueness: true, if: -> { email.present? }
  validates :email, presence: true, format: { with: /\A[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\z/, message: "format is not correct" }, if: -> { email.present? }
end
