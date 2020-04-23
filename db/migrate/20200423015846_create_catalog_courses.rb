class CreateCatalogCourses < ActiveRecord::Migration[6.0]
  def change
    create_table :catalog_courses do |t|
      t.references :catalog, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
