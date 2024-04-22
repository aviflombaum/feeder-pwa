class CreatePushSubscriptions < ActiveRecord::Migration[7.2]
  def change
    create_table :push_subscriptions do |t|
      t.json :data
      t.integer :user_id

      t.timestamps
    end
  end
end
