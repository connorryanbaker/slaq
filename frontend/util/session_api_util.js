export const createUser = user => {
  return $.ajax({
    method: 'POST',
    url: 'api/users/',
    data: { user } 
  });
}

export const createSession = user => {
  return $.ajax({
    method: 'POST',
    url: 'api/session',
    data: { user }
  });
}

export const destroySession = () => {
  return $.ajax({
    method: 'DELETE',
    url: 'api/session'
  });
}

export const fetchUsers = channelId => {
  return $.ajax({
    method: 'GET',
    url: `api/channels/${channelId}/users`
  });
}

export const fetchDmUsers = dmId => {
  return $.ajax({
    method: 'GET',
    url: `api/dms/${dmId}/users`
  });
}