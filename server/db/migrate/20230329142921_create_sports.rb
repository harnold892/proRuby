class CreateSports < ActiveRecord::Migration[7.0]
  def change
    create_table :sports do |t|
      t.string :name_sport
      t.integer :capacity_sport
      t.decimal :price_sport
      t.string :description_sport
      t.date :starting_date_sport
      t.date :ending_date_sport
      t.references :hotel, index: true, foreign_key: true

      t.timestamps
    end
  end
end
