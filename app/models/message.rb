class Message < ApplicationRecord
  validates :content, :user_id, presence: true 
  
end
