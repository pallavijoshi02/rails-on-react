Bundler.require(:commandline)
require "highline/import"
namespace :users do
  desc "create super user"
  task :create_super_admin => [:environment] do
    name = ask("Enter super admin name:  ") { |q| q.echo = true }
    email = ask("Enter super admin email:  ") { |q| q.echo = true }
    password = ask("Enter super admin password:  ") { |q| q.echo = "*" }
    password_confirmation = ask("Enter super admin password (confirmation):  ") { |q| q.echo = "*" }
    user = User.new(:name => name, :email => email, :password => password)
    if user.save
      puts "Super admin user #{email} has been created"
    else
      puts "Unable to create super admin user due to following errors"
      puts *user.errors.full_messages
    end
  end
end
