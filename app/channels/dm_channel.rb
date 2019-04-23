class DmChannel < ApplicationCable::Channel
  def subscribed
    dm = Dm.find(params[:id])
    stream_for dm 
  end

  def unsubscribed
  end

  def speak(data)
    id = data["message"]["messageable_id"]
    dm = Dm.find(id)
    msg = dm.messages.create(data["message"])

    DmChannel.broadcast_to(dm, {type: "dm_msg", message: msg, dm_id: dm.id })
  end 
end
