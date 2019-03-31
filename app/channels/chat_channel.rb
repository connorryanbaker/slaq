class ChatChannel < ApplicationCable::Channel
  def subscribed
    p "PARAMS #{params}"
    stream_for 'chat_channel'
    load
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data) 
    # call Message.create and save it to a variable
    # should render_message(message) be a private method that returns a json partial?
    # call ChatChannel.broadcast_to('chat_channel', message)
    p "PARAMS #{params}"
    msg = Message.create(data['message'])
    # this next line will eventually be transformed into just calling a partial renderer
    ChatChannel.broadcast_to('chat_channel', {type: 'msg', message: msg})
  end

  def load 
    messages = Message.all
    data = {type: 'msgs', messages: messages}
    ChatChannel.broadcast_to('chat_channel', {type: 'msgs', messages: messages})
  end
  
  private 
  def render_messages(msgs)
    ApplicationController.renderer.render(template: '/api/messages/index', locals: { messages: msgs }) 
  end

end
