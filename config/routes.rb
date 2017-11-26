Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :moods
  root 'application#index'

  # match '/moods' => 'moods#create', :via => :post

end
