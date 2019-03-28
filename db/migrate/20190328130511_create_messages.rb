class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.text :content, null: false
      t.integer :user_id, null: false
      t.integer :parent_message_id
      t.integer :messageable_id
      t.string :messageable_type

      t.timestamps
    end
  end
end
