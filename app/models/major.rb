class Major < ApplicationRecord
	has_many :users
	has_many :plans
	has_many :requirements
end
