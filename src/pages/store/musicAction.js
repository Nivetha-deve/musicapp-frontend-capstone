export const UPDATE_LIKED_STATE = 'UPDATE_LIKED_STATE';
export const SUBMIT_COMMENT = 'SUBMIT_COMMENT';
export const COMMENT_SUBMITTED = 'COMMENT_SUBMITTED';
export const COMMENT_FAILED = 'COMMENT_FAILED';
export const ADD_COMMENT = 'ADD_COMMENT';

export const updateLikedState = (index) => ({
    type: UPDATE_LIKED_STATE,
    payload: index,
  });


export const addcomment = ({ index, comment }) => ({
  type: ADD_COMMENT,
  payload: { index, comment },
});

export const submitComment = ({ index, comment }) => ({
  type: SUBMIT_COMMENT,
  payload: { index, comment },
});
