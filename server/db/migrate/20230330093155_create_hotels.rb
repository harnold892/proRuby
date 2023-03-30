class CreateHotels < ActiveRecord::Migration[7.0]
  def change
    create_table :hotels do |t|
      t.string :name_hotel
      t.string :address_hotel

      t.timestamps
    end
  end
end
