class AddCreatorIdToChannels < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :creator_id, :integer
  end
end
