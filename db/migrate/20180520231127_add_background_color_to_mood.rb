class AddBackgroundColorToMood < ActiveRecord::Migration[5.1]
  def change
    add_column :moods, :background, :string
  end
end
