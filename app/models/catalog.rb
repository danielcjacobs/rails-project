class Catalog < ApplicationRecord
	has_many :catalog_courses
	has_many :courses, through: :catalog_courses
	has_many :requirements
	has_many :plans
end
