Rails.application.routes.draw do
  root 'plans#index'
  resources :plans
  resources :plan_courses
  devise_for :users, :controllers => {:registrations => 'registrations'}
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
