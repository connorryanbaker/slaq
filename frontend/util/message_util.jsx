export const fetchMessages = () => {
  return $.ajax({
    url: 'api/messages',
    method: 'GET'
  });
}