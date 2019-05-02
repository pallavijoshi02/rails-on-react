class UserGroupsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:index, :show, :create, :update, :destroy]
  
  def index    
    begin
      @user_groups = UserGroup.all
      render json: { success: "loading...", user_groups: @user_groups }, status: :ok
    rescue => exception
      render json: { error: exception.message }, status: :unprocessable_entity
    end
  end


  def show
    begin
      if UserGroup.exists?(id: params[:id])
        @user_group = UserGroup.find(params[:id])
        render json: { success: "loading...", user_group: @user_group }, status: :ok
      else
        render json: { error: "record not found" }, status: :unprocessable_entity
      end
    rescue => exception
      render json: { error: exception.message }, status: :unprocessable_entity
    end
  end

  def create
    begin
      @user_group = UserGroup.new(user_group_params)
      @user_group.save
      if @user_group.id
        render json: { success: "record created sucessfully", user_group: @user_group }, status: :ok
      else
        render json: { error: "validation error", messages: @user.errors.messages, full_messages: @user.errors.full_messages }, status: :unprocessable_entity
      end
    rescue => exception
      render json: { error: exception.message }, status: :unprocessable_entity
    end
  end

  def update
    begin
      @user_group = UserGroup.find(params[:id])
      if @user_group.update_attributes(user_group_params)
        render json: { success: "record update sucessfully" }, status: :ok
      else
        render json: { error: "validation error", messages: @user.errors.messages, full_messages: @user.errors.full_messages }, status: :unprocessable_entity
      end
    rescue => exception
      render json: { error: exception.message }, status: :unprocessable_entity
    end
  end

  def destroy
    begin
      if UserGroup.exists?(id: params[:id])
        @user_group = UserGroup.where(id: params[:id]).first
        if @user_group.destroy
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

  def user_group_params
    params.require(:user_group).permit(:name, :permision)
  end

end
