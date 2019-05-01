Rails.application.routes.draw do
  resources :users
  get "home/index"
  root to: "home#index"
  match "/dashboard", to: "home#index", via: :get
  match "/dashboard/*path", to: "home#index", via: :get
  post 'authenticate', to: 'authentication#authenticate'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
