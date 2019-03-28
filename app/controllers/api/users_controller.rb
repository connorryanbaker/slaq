class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show; end 

  def index
    # eventually this will take a channel as an argument and grab the channel users
    # for now we get them all
    @users = User.all 
    render :index
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
