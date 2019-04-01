Rails.application.routes.draw do

  root to: 'static_pages#root'
  mount ActionCable.server, at: '/cable' 


  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :messages, only: [:create, :update, :destroy]
    resources :channels, only: [:show, :index, :create, :destroy] do 
      resources :messages, only: [:index]
      resources :users, only: [:index]
    end
  end
end
