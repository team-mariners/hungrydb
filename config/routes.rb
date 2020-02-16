Rails.application.routes.draw do
  devise_for :admins, controllers: {
    sessions:           "admins/sessions"
  }
  devise_for :users, controllers: {
    sessions:           "users/sessions",
    passwords:          "users/passwords",
    registrations:      "users/registrations",
    confirmations:      "users/confirmations",
  }
  root 'pages#index'
  get 'signup', to: 'users#main'
  get 'login', to: 'users#main'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
