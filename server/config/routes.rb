Rails.application.routes.draw do
  post "registration", to: "registration#create"
  
  get "spa/user", to: "spa#user"
  get "spa/admin", to: "spa#admin"
  post "spa/create", to: "spa#create"

  post "sport/create", to: "sport#create"
  get "sport/admin", to: "sport#admin"

  post "hotel/create", to: "hotel#create"
  get "hotel/admin", to: "hotel#admin"

  post "room/create", to: "room#create"
  get "room/admin", to: "room#admin"

  post "login", to: "auth#login"
 
  root to: "static#home"
end
