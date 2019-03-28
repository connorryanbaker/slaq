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
    msg = Message.create(data['message'])
    # this next line will eventually be transformed into just calling a partial renderer
    ChatChannel.broadcast_to('chat_channel', msg)
  end
end
