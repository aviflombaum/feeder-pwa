class Feed < ApplicationRecord
  has_many :items, dependent: :destroy
end
