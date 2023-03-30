class CreateReservationSpas < ActiveRecord::Migration[7.0]
  def change
    create_table :reservation_spas do |t|
      t.references :spa, index: true, foreign_key: true
      t.references :receipt, index: true, foreign_key: true
      t.timestamps
    end
  end
end
