Rails.application.routes.draw do
  devise_for :users, skip: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
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

  authenticated :user do
    root to: 'users#index', as: :authenticated_root

    scope '/manager' do
      get 'manage', to: 'managers#index'
      get 'orders', to: 'managers#index'
      get 'stats', to: 'managers#index'
      get 'reviews', to: 'managers#index'
      get 'manage_menu', to: 'managers#index'
      get 'manage_promo', to: 'managers#index'
      get 'manage_info', to: 'managers#index'
    end
  end

  root to: 'pages#home'
end
