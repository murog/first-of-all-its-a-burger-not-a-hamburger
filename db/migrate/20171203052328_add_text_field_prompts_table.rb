class AddTextFieldPromptsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :prompts, :text, :string
  end
end
