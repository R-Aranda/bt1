class Comment < ApplicationRecord
  validates :body, presence: true, length: { minimum: 1 }

  belongs_to :post
end