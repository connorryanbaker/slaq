class CreateDms < ActiveRecord::Migration[5.2]
  def change
    create_table :dms do |t|
      t.integer :creator_id, null: false

      t.timestamps
    end
  end
end
