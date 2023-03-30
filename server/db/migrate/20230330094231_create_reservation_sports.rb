class CreateReservationSports < ActiveRecord::Migration[7.0]
  def change
    create_table :reservation_sports do |t|
      t.references :sport, index: true, foreign_key: true
      t.references :receipt, index: true, foreign_key: true

      t.timestamps
    end
  end
end
