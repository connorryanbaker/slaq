import * as DmApiUtil from '../util/dm_util';

export const RECEIVE_DM = "RECEIVE_DM";
export const RECEIVE_DMS = "RECEIVE_DMS";

export const receiveDms = dms => {
  return {
  type: RECEIVE_DMS,
  dms
  }
}

export const receiveDm = dm => ({
  type: RECEIVE_DM,
  dm
})

export const fetchDms = userId => dispatch => {
  return DmApiUtil.fetchDms(userId)
    .then(dms =>  {
      dispatch(receiveDms(dms));
      })
}

export const createDm = (creatorId, receiverId) => dispatch => {
  return DmApiUtil.createDm(creatorId, receiverId)
    .then(dm => dispatch(receiveDm))
}

export const mostRecentUserDm = creatorId => dispatch => {
  return DmApiUtil.mostRecentUserDm(creatorId);
}
