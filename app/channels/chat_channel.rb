class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_channel
    load
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data) 
    msg = current_channel.messages.create(data['message'])
    ChatChannel.broadcast_to(current_channel, {type: 'msg', message: msg})
  end

  def load 
    p current_channel
    p current_channel.messages.length
    messages = current_channel.messages
    data = {type: 'msgs', messages: messages}
    ChatChannel.broadcast_to(current_channel, {type: 'msgs', messages: messages})
  end
  
  private 
    def current_channel 
      Channel.find(params[:id]) 
    end

    def render_messages(msgs)
      ApplicationController.renderer.render(template: '/api/messages/index', locals: { messages: msgs }) 
    end

end
