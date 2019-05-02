class AuthenticationController < ApplicationController
    skip_before_action :authenticate_request,:verify_authenticity_token    

    def authenticate              
        command = AuthenticateUser.call(params[:username], params[:password])

        if command.success?
            render json: { access_token: command.result }
        else
            render json: { errors: command.errors }, status: :unauthorized
        end
    end    

end
