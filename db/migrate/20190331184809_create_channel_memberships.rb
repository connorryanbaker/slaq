class CreateChannelMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :channel_memberships do |t|
      t.integer :channel_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :channel_memberships, [:channel_id, :user_id], unique: true
  end
end
