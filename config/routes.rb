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

    get 'rider', to: 'pages#rider'
    get 'jobs', to: 'pages#jobs'
    get 'jobsHistory', to: 'pages#jobsHistory'

  end

  authenticated :user do
    root to: 'users#index', as: :authenticated_root

    scope '/admin' do
      get 'dashboard', to: 'admins#index'
      get 'roles', to: 'admins#index'
      get 'roles/:id', to: 'admins#index'
      get 'statistics', to: 'admins#index'

      post 'getuserid', to: 'admins#getuserid'
    end

    scope '/manager' do
      get 'manage', to: 'managers#index'
      get 'orders', to: 'managers#index'
      get 'stats', to: 'managers#index'
      get 'reviews', to: 'managers#index'
      get 'manage_menu', to: 'managers#index'
      get 'manage_promo', to: 'managers#index'
      get 'manage_info', to: 'managers#index'
    end

    scope '/customer' do
      get 'home', to: 'customers#index'
      get 'history', to: 'customers#history'
      get 'reviews', to: 'customers#reviews', as: :customer_reviews_path
      get 'promotions', to: 'customers#promotions'
    end
    
    resources :foods, except: [:new, :edit, :show]
  end

  # JSON API
  namespace :api do
    namespace :v1 do
      resources :customer, only: %i[index create destroy update]
      # [:index, :create, :destroy, :update]
    end
  end

  root to: 'pages#home'
end
