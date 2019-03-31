class Message < ApplicationRecord
  validates :content, :user_id, presence: true 
  belongs_to :messageable, polymorphic: true
  belongs_to :user
end
