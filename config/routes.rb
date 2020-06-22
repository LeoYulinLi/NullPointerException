Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, default: { format: :json } do
    resources :users, only: %i[create show index update]
    resources :sessions, param: :session_token, only: %i[create destroy]
  end
end
