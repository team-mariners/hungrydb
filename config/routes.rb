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
    post 'profile', to: 'users/registrations#update'
  end

  authenticated :user do
    root to: 'users#index', as: :authenticated_root

    scope '/admin' do
      get 'dashboard', to: 'admins#index'
      get 'promotions', to: 'admins#index'
      get 'roles', to: 'admins#index'
      get 'roles/:id', to: 'admins#index'
      get 'schedule', to: 'admins#index'
      get 'schedule/:rid', to: 'admins#index'
      get 'statistics', to: 'admins#index'

      post 'getuserid', to: 'admins#getuserid'
      post 'getriderid', to: 'admins#getriderid'
      post 'updaterole', to: 'admins#updaterole'
      post 'fdspromo', to: 'admins#fdspromo'
    end

    scope '/manager' do
      get 'manage', to: 'managers#index'
      get 'promo_stats', to: 'managers#index'
      get 'orders', to: 'managers#index'
      get 'manage_menu', to: 'managers#index'
      get 'manage_menu/menu_sections/:id', to: 'managers#index'
      get 'manage_promo', to: 'managers#index'
      get 'manage_info', to: 'managers#index'
    end

    scope '/customer' do
      get 'home', to: 'customers#index'
      get 'order', to: 'customers#order', as: :customer_order_path
      get 'order/:rid/menu', to: 'customers#order'
      get 'cart', to: 'customers#cart'
      get 'complete_order', to: 'customers#complete_order'
      get 'review_order', to: 'customers#review'
      get 'history', to: 'customers#history'
      get 'reviews', to: 'customers#reviews', as: :customer_reviews_path
      get 'promotions', to: 'customers#promotions'
    end

    scope '/rider' do      
      get 'deliveries', to: 'riders#index'
      get 'schedule', to: 'riders#schedule'
      get 'salary_summary', to: 'riders#index'
      get 'check_clocked_in', to: 'riders#check_clocked_in'
      post 'clock_in', to: 'riders#clock_in'
      post 'clock_out', to: 'riders#clock_out'      
      get 'all_deliveries', to: 'riders#get_deliveries'
      get 'order/:id', to: 'riders#get_order'
      post 'update_time/:id', to: 'riders#update_time'      
      get 'fetch_salary_summary', to: 'riders#get_salary_summary_data'
    end

    resources :restaurants, except: %i[new edit show destroy]
    get 'restaurants/:rid/reviews', to: 'restaurants#reviews'

    resources :foods, except: [:new, :edit, :show, :destroy]
    get 'food/:food_name/reviews', to: 'food#reviews'
    resources :menu_sections, except: [:new, :edit, :show]
    resources :promotions, except: [:new, :edit, :show]
    resources :order, only: %i[create]
    resources :review, only: %i[create]

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
        get '/:id/reviews', to: 'restaurants#reviews'
      end

      namespace :food do
        get '/:food_name/reviews', to: 'food#reviews'
      end

      namespace :promotions do
        resources :promotions, only: %i[index create update]
        get '/index_restaurant', to: 'promotions#index_restaurant'
        get '/:id/promotions', to: 'promotions#single_restaurant_promos'
      end

      namespace :orders do
        resources :orders, only: %i[index create destroy update]
        get '/index_restaurant', to: 'orders#index_restaurant'
      end

      namespace :reviews do
        resources :reviews, only: %i[index create destroy update]
      end

      namespace :statistics do
        get '/monthy_overall_summary', to: 'statistics#monthly_overall_summary'
        get '/promotions_summary', to: 'statistics#promotions_summary'
      end
    end
  end

  root to: 'pages#home'
end
