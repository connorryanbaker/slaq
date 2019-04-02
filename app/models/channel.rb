class Channel < ApplicationRecord
  has_many :messages, as: :messageable, dependent: :destroy
  has_many :channel_memberships, dependent: :destroy
  has_many :users, through: :channel_memberships
  validates :name, presence: true, uniqueness: true, length: { maximum: 30 }
  belongs_to :creator, foreign_key: :creator_id, class_name: :User
end
