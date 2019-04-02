class Message < ApplicationRecord
  validates :content, :user_id, presence: true 
  validates :content, length: { maximum: 100 }
  belongs_to :messageable, polymorphic: true
  belongs_to :user
end
