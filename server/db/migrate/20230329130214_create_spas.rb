class CreateSpas < ActiveRecord::Migration[7.0]
  def change
    create_table :spas do |t|
      t.string :name_spa
      t.string :description_spa
      t.decimal :price_spa
      t.date :starting_date_spa
      t.date :ending_date_spa
      t.references :hotel, index: true, foreign_key: true

      t.timestamps
    end
  end
end
