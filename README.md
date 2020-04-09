# Hungrydb

![travis build status](https://travis-ci.org/team-mariners/hungrydb.svg?branch=master)

To set up the project, you can follow the installation guide on [GoRails](https://gorails.com/setup/) to intall Ruby on Rails first. The following set up guide is based on **Mac OS**. It includes additional set up information other that the summary from the guide by GoRails.

See the live application [here](http://hungrydb.herokuapp.com)!

### Use ZSH as the default shell instead of Bash
```
chsh -s /bin/zsh
```

### Install HomeBrew
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Install Ruby
The ruby version of this project is `2.6.5`.

```
brew install rbenv ruby-build

# Add rbenv to bash so that it loads every time you open a terminal
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.zshrc
source ~/.zshrc

# Install Ruby
rbenv install 2.6.5
rbenv global 2.6.5
ruby -v
```

### Install Rails
```
gem install rails -v 6.0.2.2

# Tells rbenv to 'see' the newly installed rails so that we can use the rails executable
rbenv rehash
```

Verify if rails is intalled by running
```
rails -v
```

You should see something like the following
```
rails -v
# Rails 6.0.2.2
```

### Setting up the database (PostgreSQL)
Install PostgreSQL on your machine if you haven't have it.
```
brew install postgresql
```

Once you have install PostgreSQL successfully, execute the following command
```
# To have launchd start postgresql at login:
brew services start postgresql
```

### Additional Steps (For MacOS Mojave onwards)
Mojave changed the location of header files necessary for compiling C extensions. You might need to run the following command to install pg, nokogiri, or other gems that require C extensions: (from GoRails doc)
```
sudo installer -pkg /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg -target /
```

### Install Dependencies
Install ruby dependencies of the application.
```
bundle install
```

Install javascript dependencies of the application.
```
yarn install
```

* If you do not have yarn on your machine, you can follow the [guide here](https://classic.yarnpkg.com/en/docs/install/) to install it.


### Set up Database
Execute the following command to set up the database of the application.
```
rails db:create db:migrate db:seed
```

### Start the Web Server
Execute the following command to start the servers of the application.
```
# Start the application server
rails server

# Start webpack server to serve frontend assets (hot reloading)
bin/webpack-dev-server
```

### Notes
1. Some cron jobs are added to the application to e.g. reset the number of orders every midnight. They are written in Ruby and can be found in `lib/tasks/database.rake`
* For the cron jobs to be executed, the server needs to be enabled 24 hours if it's run on your local machine.

* The cron jobs are not currently enabled on the hosted application on Heroku as it's charged.
