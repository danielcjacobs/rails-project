class AddCurrTermToPlans < ActiveRecord::Migration[6.0]
  def change
    add_column :plans, :curr_term, :string
  end
end
