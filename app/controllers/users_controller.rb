class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @users = User.all
    render json: @users, status: :ok
  end

  def show
    @user = User.find(params[:id])
    render json: @user, status: :ok
  end

  def create
    @user = User.new(user_params)
    @user.save
    render json: @user, status: :ok
  end

  def distroy
    @user = User.where(id: params[:id]).first
    if @user.distroy
      head(:ok)
    else
      head(:unprocessable_entity)
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :contact, :password)
  end
end
