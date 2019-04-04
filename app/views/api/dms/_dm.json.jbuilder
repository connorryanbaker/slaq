json.id dm.id 
json.users dm.users.map(&:id)
json.name dm.users.map(&:name).reject {|name| name == current_user.name}