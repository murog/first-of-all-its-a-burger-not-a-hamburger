# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

# item seeds
ITEM_FILE = Rails.root.join('db', 'item-seeds.csv')
puts "Loading raw item data from #{ITEM_FILE}"

item_failures = []
CSV.foreach(ITEM_FILE, :headers => true) do |row|
  item = Item.new
  item.name = row['name']
  item.url = row['url']
  item.alt_text = row['alt_text']
  successful = item.save
  if !successful
    item_failures << item
  end
end

puts "Added #{Item.count} item records"
puts "#{item_failures.length} items failed to save"
item_failures.each do |item|
  item.errors.each do |key, value|
    puts "#{key}: #{value}"
  end
end

# prompts seed
PROMPT_FILE = Rails.root.join('db', 'prompt-seeds.csv')
puts "Loading raw item data from #{PROMPT_FILE}"

prompt_failures = []
CSV.foreach(PROMPT_FILE, :headers => true) do |row|
  prompt = Prompt.new
  prompt.text = row['text']
  successful = prompt.save
  if !successful
    prompt_failures << prompt
  end
end

puts "Added #{Prompt.count} prompt records"
puts "#{prompt_failures.length} prompt failed to save"
prompt_failures.each do |prompt|
  prompt.errors.each do |key, value|
    puts "#{key}: #{value}"
  end
end

puts "manually resetting pk sequence on each table"
ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

puts "done"
