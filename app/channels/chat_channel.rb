class ChatChannel < ApplicationCable::Channel
  def subscribed
    channel = Channel.find(params[:id])
    load_user_into_channel(channel)
    stream_for channel
  end

  def unsubscribed
  end

  def speak(data) 
    id = data["message"]["messageable_id"]
    channel = Channel.find(id)
    msg = channel.messages.create(data['message'])


    load_user_into_channel(channel)

    ChatChannel.broadcast_to(channel, {type: 'msg', message: msg, channel_id: channel.id})
  end

  def load_user_into_channel(channel)
    channel.users << current_user unless channel.users.include?(current_user)
  end
end
