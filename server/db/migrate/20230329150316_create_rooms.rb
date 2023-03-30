class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.boolean :is_apartment
      t.integer :capacity_room
      t.decimal :price_room
      t.integer :number_room
      t.references :hotel, index: true, foreign_key: true
      
      t.timestamps
    end
  end
end
