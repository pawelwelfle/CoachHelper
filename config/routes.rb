Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, :controllers => { registrations: 'registrations' }
  root to: "home#index"

  get 'players' => 'players#players'
  get '/player' => 'players#index'
  post 'players' => 'players#create' 
  get '/players/new' => 'players#new'
end
