class RegistrationController < ApplicationController
    
    def create
        user = User.create!(
            username: params['username'],
            password: params['password'],
            password_confirmation: params['password_conformation'],
            firstname: params['ime'],
            lastname: params['prezime'],
            title: params['titula'],
            datebirth: params['datum'],
            email: params['email'],
            isadmin: false
        )
    end
end