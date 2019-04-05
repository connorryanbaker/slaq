class Api::UsersController < ApplicationController
  AVATARS = ["/assets/av1-a4dabc147cfd0ac404b61b9aa8f3937cb404c951b6e32e73fc4a8ebeb363c67f.png","/assets/av2-81e193edd157ba0ee18388b0e39eaa3c6030e2223a5af68bc67b0285a51bec8d.png","/assets/av3-cdf44d41bda508d62cf0a6db233e9c74895e43fdd8983f6443684835a20a502a.png","/assets/av4-07f5f20d76d46cd5fb5167ad801615bab7bb4b3b021ac7a9063bb0735e5b604d.png"].sample

  def create
    @user = User.new(user_params)
    @user.avatar_url = AVATARS
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show; end 

  def index
    @users = params[:channel_id] ? Channel.find(params[:channel_id]).users : Dm.find(params[:dm_id]).users
    @users << current_user unless @users.include?(current_user)
    render template: 'api/users/index'
  end

  def dms
    @user = User.find(params[:id])
    dm = @user.dms.last
    render json: dm
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
