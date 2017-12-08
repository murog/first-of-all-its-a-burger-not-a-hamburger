# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171208032327) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.string "alt_text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "mood_items", force: :cascade do |t|
    t.bigint "mood_id"
    t.bigint "item_id"
    t.decimal "top_coord"
    t.decimal "left_coord"
    t.integer "z_index"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "transform"
  end

  create_table "moods", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "prompt_id"
    t.index ["prompt_id"], name: "index_moods_on_prompt_id"
    t.index ["user_id"], name: "index_moods_on_user_id"
  end

  create_table "prompts", force: :cascade do |t|
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.integer "uid"
    t.string "provider"
    t.string "email"
    t.string "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "moods", "prompts"
  add_foreign_key "moods", "users"
end
