class PushSubscriptionsController < ApplicationController
  def create
    PushSubscription.create(data: {
      endpoint: params[:endpoint],
      expirationTime: params[:expirationTime],
      keys: params[:keys]
    })
  end

  private

  def push_subscription_params
    params.permit(:data, :endpoint, :expirationTime, keys: {})
  end
end
