class CreateReservationRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :reservation_rooms do |t|
      t.date :starting_date_reservation
      t.date :ending_date_reservation
      t.references :room, index: true, foreign_key: true
      t.references :receipt, index: true, foreign_key: true
      
      t.timestamps
    end
  end
end
