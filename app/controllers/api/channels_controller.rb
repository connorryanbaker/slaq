class Api::ChannelsController < ApplicationController

  def show
    @channel = Channel.find(params[:id])
    render :show
  end

  def index
    @channels = Channel.all 
    render :index
  end
end
