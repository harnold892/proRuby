# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_30_094306) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "hotels", force: :cascade do |t|
    t.string "name_hotel"
    t.string "address_hotel"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "receipts", force: :cascade do |t|
    t.decimal "total_price"
    t.date "date_purchase"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_receipts_on_user_id"
  end

  create_table "reservation_rooms", force: :cascade do |t|
    t.date "starting_date_reservation"
    t.date "ending_date_reservation"
    t.bigint "room_id"
    t.bigint "receipt_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receipt_id"], name: "index_reservation_rooms_on_receipt_id"
    t.index ["room_id"], name: "index_reservation_rooms_on_room_id"
  end

  create_table "reservation_spas", force: :cascade do |t|
    t.bigint "spa_id"
    t.bigint "receipt_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receipt_id"], name: "index_reservation_spas_on_receipt_id"
    t.index ["spa_id"], name: "index_reservation_spas_on_spa_id"
  end

  create_table "reservation_sports", force: :cascade do |t|
    t.bigint "sport_id"
    t.bigint "receipt_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receipt_id"], name: "index_reservation_sports_on_receipt_id"
    t.index ["sport_id"], name: "index_reservation_sports_on_sport_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.boolean "is_apartment"
    t.integer "capacity_room"
    t.decimal "price_room"
    t.integer "number_room"
    t.bigint "hotel_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hotel_id"], name: "index_rooms_on_hotel_id"
  end

  create_table "spas", force: :cascade do |t|
    t.string "name_spa"
    t.string "description_spa"
    t.decimal "price_spa"
    t.date "starting_date_spa"
    t.date "ending_date_spa"
    t.bigint "hotel_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hotel_id"], name: "index_spas_on_hotel_id"
  end

  create_table "sports", force: :cascade do |t|
    t.string "name_sport"
    t.integer "capacity_sport"
    t.decimal "price_sport"
    t.string "description_sport"
    t.date "starting_date_sport"
    t.date "ending_date_sport"
    t.bigint "hotel_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hotel_id"], name: "index_sports_on_hotel_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest"
    t.string "firstname"
    t.string "lastname"
    t.string "title"
    t.date "datebirth"
    t.string "email"
    t.boolean "isadmin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "receipts", "users"
  add_foreign_key "reservation_rooms", "receipts"
  add_foreign_key "reservation_rooms", "rooms"
  add_foreign_key "reservation_spas", "receipts"
  add_foreign_key "reservation_spas", "spas"
  add_foreign_key "reservation_sports", "receipts"
  add_foreign_key "reservation_sports", "sports"
  add_foreign_key "rooms", "hotels"
  add_foreign_key "spas", "hotels"
  add_foreign_key "sports", "hotels"
end
