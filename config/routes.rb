Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'home_page#root'

  namespace :api, default: { format: :json } do
    resources :users, only: %i[create show index update]
    resource :session, only: %i[create destroy show]
    resources :questions, only: %i[create index show] do
      resources :answers, only: %i[create]
    end
  end

end
