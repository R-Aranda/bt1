class Post < ApplicationRecord
validates :title, presence: true, length: { minimum: 1 }

validates :body, presence: true, length: { minimum: 1 }

has_many :comments
end