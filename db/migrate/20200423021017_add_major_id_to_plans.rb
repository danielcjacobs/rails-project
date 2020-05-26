class AddMajorIdToPlans < ActiveRecord::Migration[6.0]
  def change
    add_reference :plans, :major, null: true, foreign_key: true
  end
end
