json.set! channel.id do 
  json.name channel.name 
  json.messages channel.messages.map(&:id)
  json.users channel.users.map(&:id)
  json.id channel.id
  json.creator_id channel.creator_id
end