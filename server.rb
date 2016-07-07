require 'sinatra'


get '/map' do

  erb :map
end


get '/stops-list' do

  erb :list
end

get '/routes' do

  erb :routes
end
