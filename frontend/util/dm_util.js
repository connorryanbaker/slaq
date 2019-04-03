export const fetchDms = userId => {
  return $.ajax({
    url: 'api/dms',
    method: 'GET',
    data: { user_id: userId }
  });
}

export const createDm = (creatorId, receiverId) => {
  return $.ajax({
    url: 'api/dms',
    method: 'POST',
    data: {
      creator_id: creatorId,
      receiver_id: receiverId
    }
  });
}

