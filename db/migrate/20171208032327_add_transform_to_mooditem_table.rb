class AddTransformToMooditemTable < ActiveRecord::Migration[5.1]
  def change
    add_column :mood_items, :transform, :string
  end
end
