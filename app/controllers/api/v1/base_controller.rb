class Api::V1::BaseController < ApplicationController
    # All actions from controllers that inherit base controller respond with JSON
    respond_to :json
end