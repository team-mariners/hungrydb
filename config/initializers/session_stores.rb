if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_hungrydb', domain: 'hungrydb.herokuapp.com'
else
  Rails.application.config.session_store :cookie_store, key: '_hungrydb'
end
