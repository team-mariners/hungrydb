Rails.application.routes.draw do
  devise_for :users, skip: :all
  root to: 'pages#index'

  devise_scope :user do
    get 'login', to: 'users/sessions#new'
    post 'login', to: 'users/sessions#create'

    get 'logout', to: 'users/sessions#destroy'

    get 'signup', to: 'users/registrations#new'
    post 'signup', to: 'users/registrations#create'

    get 'profile', to: 'users/registrations#edit'
    patch 'profile', to: 'users/registrations#update'
    put 'profile', to: 'users/registrations#update'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
