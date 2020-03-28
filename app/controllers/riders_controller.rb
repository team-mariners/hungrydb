class RidersController < UsersController
    before_action do
        verify_role!('rider')
    end
    
    def index
    end
end