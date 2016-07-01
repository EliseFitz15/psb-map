require 'sinatra'


get '/map' do

  erb :map
end


get '/stops-list' do

  erb :list
end

get '/zip' do

  erb :zip
end
