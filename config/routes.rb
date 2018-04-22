Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :moods
  root 'application#index'
  get "/auth/:provider/callback", to: "sessions#create"
  post '/logout', to: 'sessions#logout', as: 'logout'
  get '/gallery', to: 'moods#gallery', as: 'gallery'

  # match '/moods' => 'moods#create', :via => :post

end
