class Api::MessagesController < ApplicationController
  def create
  end

  def update
    @message = Message.find(params[:id])
    if @message.update(message_params)
      render :show 
    else  
      render json: @message.errors.full_messages
    end
  end

  def destroy
    @message = Message.find(params[:id])
    @message.destroy 
    render :show
  end

  def index
    @messages = Message.all 
    render :index 
  end

  private
  def message_params
    params.require(:message).permit(:content, :user_id)
  end
end
