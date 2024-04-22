class CreateFeeds < ActiveRecord::Migration[7.2]
  def change
    create_table :feeds do |t|
      t.string :title
      t.string :url
      t.text :description

      t.timestamps
    end
  end
end
