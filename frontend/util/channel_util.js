export const fetchChannels = () => {
  return $.ajax({
    url: 'api/channels',
    method: 'GET'
  });
};

export const createChannel = name => {
  return $.ajax({
    url: `api/channels`,
    method: 'POST',
    data: { channel: { name } }
  })
}

export const deleteChannel = id => {
  return $.ajax({
    url: `api/channels/${id}`,
    method: 'DELETE'
  });
}