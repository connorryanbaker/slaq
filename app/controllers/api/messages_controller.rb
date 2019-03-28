class Api::MessagesController < ApplicationController
  def create
  end

  def update
  end

  def destroy
  end

  def index
    @messages = Message.all 
    render :index 
  end
end
