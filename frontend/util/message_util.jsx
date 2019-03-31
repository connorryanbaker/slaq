export const fetchMessages = () => {
  return $.ajax({
    url: 'api/messages',
    method: 'GET'
  });
}

export const updateMessage = message => {
  return $.ajax({
    url: `api/messages/${message.message.id}`,
    method: 'PATCH',
    data: message
  });
}

export const deleteMessage = id => {
  return $.ajax({
    url: `api/messages/${id}`,
    method: 'DELETE',
  });
}