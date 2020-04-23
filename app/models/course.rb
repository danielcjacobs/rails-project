class Course < ApplicationRecord
	has_many :plan_courses
 	has_many :plans, through: :plan_courses
	
	has_many :catalog_courses
	has_many :catalogs, through: :catalog_courses
	
	has_many :category_courses
	has_many :categories, through: :category_courses
end
