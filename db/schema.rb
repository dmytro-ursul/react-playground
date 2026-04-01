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

ActiveRecord::Schema[7.1].define(version: 2026_03_25_090000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.integer "position"
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_projects_on_deleted_at"
    t.index ["name"], name: "index_projects_on_name"
    t.index ["position"], name: "index_projects_on_position"
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "push_subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.text "endpoint", null: false
    t.string "p256dh_key", null: false
    t.string "auth_key", null: false
    t.datetime "expiration_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["endpoint"], name: "index_push_subscriptions_on_endpoint", unique: true
    t.index ["user_id"], name: "index_push_subscriptions_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.boolean "completed"
    t.bigint "project_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position"
    t.date "due_date"
    t.datetime "deleted_at"
    t.date "push_notified_on"
    t.index ["deleted_at"], name: "index_tasks_on_deleted_at"
    t.index ["name"], name: "index_tasks_on_name"
    t.index ["project_id", "position"], name: "index_tasks_on_project_id_and_position"
    t.index ["project_id"], name: "index_tasks_on_project_id"
    t.index ["push_notified_on"], name: "index_tasks_on_push_notified_on"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.integer "failed_attempts", default: 0, null: false
    t.datetime "locked_until"
    t.string "otp_secret"
    t.boolean "otp_enabled", default: false, null: false
  end

  add_foreign_key "projects", "users"
  add_foreign_key "push_subscriptions", "users"
  add_foreign_key "tasks", "projects"
end
