class CreateMoodItems < ActiveRecord::Migration[5.1]
  def change
    create_table :mood_items do |t|
      t.bigint :mood_id
      t.bigint :item_id
      t.decimal :top_coord
      t.decimal :left_coord
      t.integer :z_index
      
      t.timestamps
    end
  end
end
