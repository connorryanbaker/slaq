class DmMembership < ApplicationRecord
  belongs_to :user
  belongs_to :dm 
  validates :user_id, :dm_id, presence: true
end
