class Api::MessagesController < ApplicationController
  def create
  end

  def update
    @message = Message.find(params[:id])
    if @message.update(message_params)
      channel = Channel.find(@message.messageable_id)
      ChatChannel.broadcast_to(channel, {type: 'update_msg', message: @message, channel_id: channel.id})
      render :show
    else  
      render json: @message.errors.full_messages
    end
  end

  def destroy
    @message = Message.find(params[:id])
    @message.destroy 
    channel = Channel.find(@message.messageable_id)
    ChatChannel.broadcast_to(channel, {type: 'remove_msg', message: @message, channel_id: channel.id})
    render :show
  end

  def index
    page = params[:page] || 1
    messageable_id = params[:channel_id] || params[:dm_id]
    @messages = Message.where(messageable_id: messageable_id).order(created_at: :desc).page(page)
    render template: 'api/messages/index'
  end

  private
  def message_params
    params.require(:message).permit(:content, :user_id)
  end
end
