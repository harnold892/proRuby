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

  post "receipt/new", to: "receipt#new"
  post "receipt/rooms", to: "receipt#rooms"
  post "receipt/sport", to: "receipt#sport"
  post "receipt/spa", to: "receipt#spa"

  get "reservation/available/:check_in_date/:check_out_date", to: "reservation#available"
  get "reservation/sport/:check_in_date/:check_out_date/:hotel_id", to: "reservation#sport"

  root to: "static#home"
end
