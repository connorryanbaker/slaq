class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_for Channel.find(params[:id])
    load(params[:id])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data) 
    id = data["message"]["messageable_id"]
    channel = Channel.find(id)
    channel.users << current_user unless channel.users.include?(current_user)
    msg = channel.messages.create(data['message'])
    ChatChannel.broadcast_to(channel, {type: 'msg', message: msg})
  end

  def load(id) 
    channel = Channel.find(id)
    messages = channel.messages
    channel.users << current_user unless channel.users.include?(current_user)
    data = {type: 'msgs', messages: messages}
    ChatChannel.broadcast_to(channel, {type: 'msgs', messages: messages})
  end

end
