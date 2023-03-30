class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest
      t.string :firstname
      t.string :lastname
      t.string :title
      t.date :datebirth
      t.string :email
      t.boolean :isadmin

      t.timestamps
    end
  end
end
