class HomeController < ApplicationController
  skip_before_action :authenticate_request  

  def index
  end

  def update_language
    cookies[:lang] = {
      value: params[:lang],
      expires: 1.year.from_now,
    }
    if cookies[:lang].blank?
      render json: { success: "language not changed" }, status: :ok        
    else
      render json: { success: "language changed" }, status: :ok
    end
  end

end
