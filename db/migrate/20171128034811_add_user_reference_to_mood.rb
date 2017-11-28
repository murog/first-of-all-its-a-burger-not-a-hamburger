class AddUserReferenceToMood < ActiveRecord::Migration[5.1]
  def change
    add_reference :moods, :user, foreign_key: true 
  end
end
