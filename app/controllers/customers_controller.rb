class CustomersController < UsersController
  before_action do
    if !helpers.user_has_role?('customer')
      return_unauthorized
    end
  end
  
  def index
  end

  def history
  end

  def reviews
  end

  def promotions
  end
end
  