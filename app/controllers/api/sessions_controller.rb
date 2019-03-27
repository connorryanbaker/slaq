class Api::SessionsController < ApplicationController
  def create
    p params
    @user = User.find_by_credentials(params[:user][:email],
                                     params[:user][:password])
    if @user 
      login!(@user)
      render template: 'api/users/show'
    else
      render json: "Invalid Email/Password", status: 422
    end
  end

  def destroy 
    if current_user
      logout!
    end
  end
end
