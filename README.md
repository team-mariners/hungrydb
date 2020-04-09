# Hungrydb

![travis build status](https://travis-ci.org/team-mariners/hungrydb.svg?branch=master)

To set up the project, you can follow the installation guide on [GoRails](https://gorails.com/setup/). 
The following set up guide for rails is based on Mac OS and is summarised from the guide in the link above.

1) Use ZSH as the default shell instead of Bash
`chsh -s /bin/zsh`

2) Install HomeBrew
`ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

3) Install Ruby
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

4) Install Rails



This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
