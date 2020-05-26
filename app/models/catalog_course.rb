class CatalogCourse < ApplicationRecord
  belongs_to :catalog
  belongs_to :course
end
