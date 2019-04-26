class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:index, :show, :create, :destroy]

  def index
    begin
      @users = User.all
      render json: { success: "loading...", users: @users }, status: :ok
    rescue => exception
      render json: { error: exception.message }, status: :unprocessable_entity
    end
  end

  def show
    begin
      if User.exists?(id: params[:id])
        @user = User.find(params[:id])
        render json: { success: "loading...", user: @user }, status: :ok
      else
        render json: { error: "record not found" }, status: :unprocessable_entity
      end
    rescue => exception
      render json: { error: exception.message }, status: :unprocessable_entity
    end
  end

  def create
    begin
      @user = User.new(user_params)
      @user.save
      if @user.id
        render json: { success: "record created sucessfully", user: @user }, status: :ok
      else
        render json: { error: "validation error", messages: @user.errors.messages, full_messages: @user.errors.full_messages }, status: :unprocessable_entity
      end
    rescue => exception
      render json: { error: exception.message }, status: :unprocessable_entity
    end
  end

  def destroy
    begin
      if User.exists?(id: params[:id])
        @user = User.where(id: params[:id]).first
        if @user.destroy
          render json: { success: "delete success" }, status: :ok
        else
          render json: { error: "record not found" }, status: :unprocessable_entity
        end
      else
        render json: { error: "record not found" }, status: :unprocessable_entity
      end
    rescue => exception
      render json: { error: exception.message }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :contact, :password_digest)
  end
end
