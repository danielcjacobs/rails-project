class AddCurrYearToPlans < ActiveRecord::Migration[6.0]
  def change
    add_column :plans, :curr_year, :integer
  end
end
