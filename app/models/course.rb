class Course < ApplicationRecord
	has_many :plan_courses
 	has_many :plans, through: :plan_courses
end
