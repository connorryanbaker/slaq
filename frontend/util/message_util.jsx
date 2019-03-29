export const fetchMessages = () => {
  return $.ajax({
    url: 'api/messages',
    method: 'GET'
  });
}

export const updateMessage = message => {
  return $.ajax({
    url: `api/messages/`,
    method: 'PATCH',
    data: message
  });
}