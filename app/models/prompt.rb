class Prompt < ApplicationRecord
  has_many :moods

  def self.generate_prompt
    return Prompt.all.shuffle[0]
  end

end
