class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_for 'chat_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data) 
    # call Message.create and save it to a variable
    # should render_message(message) be a private method that returns a json partial?
    # call ChatChannel.broadcast_to('chat_channel', message)
    msg = Message.create(content: data['message'])
    # this next line will eventually be transformed into just calling a partial renderer
    template = { user_id: msg.user_id, content: msg.content }
    ChatChannel.broadcast_to('chat_channel', template)
  end
end
