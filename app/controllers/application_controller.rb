class ApplicationController < ActionController::Base
  before_action :set_locale, :authenticate_request
  attr_reader :current_user

  private

  def set_locale
    I18n.locale = cookies[:lang] || I18n.default_locale
  end

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    render json: { error: "Not Authorized" }, status: 401 unless @current_user
  end
end
