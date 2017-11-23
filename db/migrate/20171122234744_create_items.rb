class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.string :name
      t.string :url
      t.string :alt_text
      t.timestamps
    end
  end
end
