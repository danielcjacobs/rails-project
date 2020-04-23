class AddCatalogIdToPlans < ActiveRecord::Migration[6.0]
  def change
    add_reference :plans, :catalog, null: true, foreign_key: true
  end
end
