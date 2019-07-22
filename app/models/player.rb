class Player < ApplicationRecord
  has_many :injuries, dependent: :destroy
  belongs_to :user
  enum trained_in: [:club, :country, :europe, :world]
  validates :name, :surname, :birth_date, :trained_in, presence: true
  validates :red_cards, :yellow_cards, numericality: { only_inteager: true }
  validates :red_cards, numericality: { less_than_or_equal_to: 1, greater_than_or_equal_to: 0, only_integer: true }
  validates :yellow_cards, numericality: { less_than_or_equal_to: 4, greater_than_or_equal_to: 0, only_integer: true }
end
