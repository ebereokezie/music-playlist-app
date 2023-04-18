Rails.application.routes.draw do
  post '/signup', to: "users#create"
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :playlists, param: :slug
  resources :songs
  resources :playlist_songs
end
