require "application_system_test_case"

class UserGroupsTest < ApplicationSystemTestCase
  setup do
    @user_group = user_groups(:one)
  end

  test "visiting the index" do
    visit user_groups_url
    assert_selector "h1", text: "User Groups"
  end

  test "creating a User group" do
    visit user_groups_url
    click_on "New User Group"

    fill_in "Name", with: @user_group.name
    fill_in "Permission", with: @user_group.permission
    click_on "Create User group"

    assert_text "User group was successfully created"
    click_on "Back"
  end

  test "updating a User group" do
    visit user_groups_url
    click_on "Edit", match: :first

    fill_in "Name", with: @user_group.name
    fill_in "Permission", with: @user_group.permission
    click_on "Update User group"

    assert_text "User group was successfully updated"
    click_on "Back"
  end

  test "destroying a User group" do
    visit user_groups_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "User group was successfully destroyed"
  end
end
