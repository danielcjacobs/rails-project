class Requirement < ApplicationRecord
  belongs_to :major
  belongs_to :catalog
end
