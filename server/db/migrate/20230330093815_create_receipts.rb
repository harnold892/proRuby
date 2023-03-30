class CreateReceipts < ActiveRecord::Migration[7.0]
  def change
    create_table :receipts do |t|
      t.decimal :total_price
      t.date :date_purchase
      t.references :user, index: true, foreign_key: true
      t.timestamps
    end
  end
end
