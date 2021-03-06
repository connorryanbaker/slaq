class Api::DmsController < ApplicationController
  def show
    @dm = Dm.find(params[:id])
    if @dm.users.include?(current_user)
      render :show 
    end
  end

  def create
    creator, receiver = User.find(params[:creator_id]), User.find(params[:receiver_id])
    
    @dm = Dm.new(creator_id: params[:creator_id])
    if @dm.no_preexisting_conversation?(receiver) && @dm.save 
      @dm.users << [creator, receiver]
      render :show 
    else  
      render @dm.errors.full_messages 
    end
  end

  def index
    @dms = current_user.dms
    render :index
  end

end
