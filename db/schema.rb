# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_23_191646) do

  create_table "catalog_courses", force: :cascade do |t|
    t.integer "catalog_id", null: false
    t.integer "course_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["catalog_id"], name: "index_catalog_courses_on_catalog_id"
    t.index ["course_id"], name: "index_catalog_courses_on_course_id"
  end

  create_table "catalogs", force: :cascade do |t|
    t.integer "year"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.integer "requirement_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["requirement_id"], name: "index_categories_on_requirement_id"
  end

  create_table "category_courses", force: :cascade do |t|
    t.integer "category_id", null: false
    t.integer "course_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_category_courses_on_category_id"
    t.index ["course_id"], name: "index_category_courses_on_course_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.string "designator"
    t.integer "credits"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "description"
  end

  create_table "majors", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "plan_courses", force: :cascade do |t|
    t.integer "plan_id", null: false
    t.integer "course_id", null: false
    t.string "term"
    t.integer "year"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_plan_courses_on_course_id"
    t.index ["plan_id"], name: "index_plan_courses_on_plan_id"
  end

  create_table "plans", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.string "curr_term"
    t.integer "curr_year"
    t.integer "major_id"
    t.integer "catalog_id"
    t.index ["catalog_id"], name: "index_plans_on_catalog_id"
    t.index ["major_id"], name: "index_plans_on_major_id"
  end

  create_table "requirements", force: :cascade do |t|
    t.integer "major_id", null: false
    t.integer "catalog_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["catalog_id"], name: "index_requirements_on_catalog_id"
    t.index ["major_id"], name: "index_requirements_on_major_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "login"
    t.integer "major_id", null: true
    t.string "role", default: "student"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["login"], name: "index_users_on_login", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "catalog_courses", "catalogs"
  add_foreign_key "catalog_courses", "courses"
  add_foreign_key "categories", "requirements"
  add_foreign_key "category_courses", "categories"
  add_foreign_key "category_courses", "courses"
  add_foreign_key "plan_courses", "courses"
  add_foreign_key "plan_courses", "plans"
  add_foreign_key "plans", "catalogs"
  add_foreign_key "plans", "majors"
  add_foreign_key "requirements", "catalogs"
  add_foreign_key "requirements", "majors"
end
