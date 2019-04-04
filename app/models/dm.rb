class Dm < ApplicationRecord
  validates :creator_id, presence: true
  belongs_to :creator, foreign_key: :creator_id, class_name: :User
  has_many :messages, as: :messageable, dependent: :destroy
  has_many :dm_memberships, dependent: :destroy
  has_many :users, through: :dm_memberships

  def no_preexisting_conversation?(user)
    creator.dms.each do |dm|
      return false if user.dms.include?(dm)
    end 
    true 
  end
end
