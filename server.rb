require 'sinatra'

get '/map' do

  erb :map
end

get '/routes' do

  erb :routes
end

get '/' do

  redirect 'map'
end
