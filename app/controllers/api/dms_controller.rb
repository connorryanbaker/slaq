class Api::DmsController < ApplicationController
  def show
    @dm = Dm.find(params[:id])
    if @dm.users.include?(current_user)
      render :show 
    end
  end

  def create
    @dm = Dm.new(creator_id: params[:creator_id])
    if @dm.save 
      creator, receiver = User.find(@dm.creator_id), User.find(params[:receiver_id])
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

  private
    def dm_params 
      params.require(:dm).permit[:creator_id, :receiver_id]
    end

end
