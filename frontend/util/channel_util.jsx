export const fetchChannels = () => {
  return $.ajax({
    url: 'api/channels',
    method: 'GET'
  });
};