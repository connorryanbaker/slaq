class Channel < ApplicationRecord
  has_many :messages, as: :messageable
  has_many :channel_memberships
  has_many :users, through: :channel_memberships
  validates :name, presence: true, uniqueness: true
end
