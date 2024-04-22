class PushSubscription < ApplicationRecord
  def send_notification(message = {})
    WebPush.payload_send(
      message: message.merge(options: {}).to_json,
      endpoint: data["endpoint"],
      p256dh: data["keys"]["p256dh"],
      auth: data["keys"]["auth"],
      vapid: {
        subject: "mailto:sender@example.com",
        public_key: Rails.application.credentials.dig(:vapid, :public_key),
        private_key: Rails.application.credentials.dig(:vapid, :private_key)
      }
    )
  end
end
