class AddMajorIdToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :major_id, :integer
  end
end
