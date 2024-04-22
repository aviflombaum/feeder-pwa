class CreateItems < ActiveRecord::Migration[7.2]
  def change
    create_table :items do |t|
      t.string :title
      t.string :link
      t.datetime :published_at
      t.text :content
      t.integer :feed_id
      t.text :body

      t.timestamps
    end
  end
end
