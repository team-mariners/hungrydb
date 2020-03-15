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
      get 'manage_menu/menu_sections/:id', to: 'managers#index'
      get 'manage_promo', to: 'managers#index'
      get 'manage_info', to: 'managers#index'
    end

    scope '/customer' do
      get 'home', to: 'customers#index'
      get 'order', to: 'customers#order', as: :customer_order_path
      get 'order/:rid/menu', to: 'customers#order'
      get 'history', to: 'customers#history'
      get 'reviews', to: 'customers#reviews', as: :customer_reviews_path
      get 'promotions', to: 'customers#promotions'
    end
    
    resources :foods, except: [:new, :edit, :show, :destroy]        
    resources :menu_sections, except: [:new, :edit, :show]

    put '/foods/deactivate/:id', to: 'foods#deactivate'
  end

  # JSON API
  namespace :api do
    namespace :v1 do
      
      namespace :customer do
        resources :customer, only: %i[index create destroy update]
        # [:index, :create, :destroy, :update]
      end
      
      namespace :restaurants do
        resources :restaurants, only: %i[index]
        get '/:id/menu', to: 'restaurants#menu'
      end

      namespace :promotions do
        resources :fds_promotions, only: %[index]
      end
    end
  end

  root to: 'pages#home'
end
