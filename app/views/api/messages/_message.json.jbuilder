json.id message.id 
json.user_id message.user_id 
json.content message.content 
str = message.updated_at.in_time_zone.to_formatted_s.split(" ")[1][0..4]
formatted = (str[0..1].to_i % 13).to_s.concat(str[2..-1])
final = str[0..1].to_i > 11 ? formatted.concat(" PM") : formatted.concat(" AM")
json.time final 
