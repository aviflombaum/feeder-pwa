class Item < ApplicationRecord
  belongs_to :feed

  after_create :send_notification

  private

  def send_notification
    PushSubscription.all.each { |p| p.send_notification(title: title) }
  end
end
