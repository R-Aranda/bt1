Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "homes#index"
  devise_for :users

  get '/posts', to: "homes#index"
  get '/posts/:id', to: "homes#index"
  get '/posts/new', to: "homes#index"
  get '/comments', to: "homes#index"

  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :show, :create] do
        resources :comments, only: [:index, :show, :new, :create]
      end
    end
  end

end
