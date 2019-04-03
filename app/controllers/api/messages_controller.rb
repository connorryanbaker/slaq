class Api::MessagesController < ApplicationController
  def create
  end

  def update
    @message = Message.find(params[:id])
    if @message.update(message_params)
      if @message.messageable_type == 'Channel'
        channel = Channel.find(@message.messageable_id)
        ChatChannel.broadcast_to(channel, {type: 'update_msg', message: @message, channel_id: channel.id})
      else 
        dm = Dm.find(@message.messageable_id)
        DmChannel.broadcast_to(dm, {type: 'update_msg', message: @message, dm_id: dm.id})
      end
      render :show
    else  
      render json: @message.errors.full_messages
    end
  end

  def destroy
    @message = Message.find(params[:id])
    @message.destroy 
    if @message.messageable_type == "Channel"
      channel = Channel.find(@message.messageable_id)
      ChatChannel.broadcast_to(channel, {type: 'remove_msg', message: @message, channel_id: channel.id})
    else  
      dm = Dm.find(@message.messageable_id)
      DmChannel.broadcast_to(dm, {type: 'remove_msg', message: @message, dm_id: dm.id})
    end
    render :show
  end

  def index
    page = params[:page] || 1
    id = params[:channel_id] || params[:dm_id]
    type = params[:channel_id] ? 'Channel' : 'Dm'
    @messages = Message.where(messageable_id: id, messageable_type: type).order(created_at: :desc).page(page)
    render template: 'api/messages/index'
  end

  private
  def message_params
    params.require(:message).permit(:content, :user_id)
  end
end
