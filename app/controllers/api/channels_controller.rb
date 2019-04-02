class Api::ChannelsController < ApplicationController

  def show
    @channel = Channel.find(params[:id])
    render :show
  end

  def index
    @channels = Channel.all.includes(:messages).includes(:users)
    render :index
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.creator = current_user
    @channel.users << current_user
    if @channel.save 
      render :show 
    else  
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.find(params[:id])
    return nil unless @channel.creator.id == current_user.id
    @channel.destroy 
    render :show
  end


  private 
    def channel_params 
      params.require(:channel).permit(:name)
    end
end
