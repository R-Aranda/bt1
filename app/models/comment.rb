class Comment < ApplicationRecord
  validates :body, presence: true, length: { minimum: 10 }

  belongs_to :question
end