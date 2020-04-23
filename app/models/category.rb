class Category < ApplicationRecord
  belongs_to :requirement
  has_many :category_courses
  has_many :courses, through: :category_courses
end
