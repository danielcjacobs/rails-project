class Plan < ApplicationRecord
	belongs_to(:user)
	has_many :plan_courses
 	has_many :courses, through: :plan_courses
end
