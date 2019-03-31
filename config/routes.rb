Rails.application.routes.draw do

  root to: 'static_pages#root'
  mount ActionCable.server, at: '/cable' 


  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:create, :show, :index]
    resource :session, only: [:create, :destroy]
    resources :messages, only: [:create, :update, :destroy, :index]
    resources :channels, only: [:show, :index]
  end
end
