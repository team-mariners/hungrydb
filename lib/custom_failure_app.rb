class CustomFailureApp < Devise::FailureApp
  # Configure the HTTP response when login fails
  def respond
    self.status = 401
    self.response_body = 'Invalid login credentials'
  end
end
