export const fetchMessages = channelId => {
  return $.ajax({
    url: `api/channels/${channelId}/messages`,
    method: 'GET',
  });
}

export const fetchDmMessages = dmId => {
  return $.ajax({
    url: `api/dms/${dmId}/messages`,
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

export const fetchPaginatedMessages = (channelId, page) => {
  return $.ajax({
    url: `api/channels/${channelId}/messages`,
    method: 'GET',
    data: { page: page}
  });
}

export const fetchPaginatedDmMessages = (dmId, page) => {
  return $.ajax({
    url: `api/dms/${dmId}/messages`,
    method: 'GET',
    data: { page: page }
  });
}