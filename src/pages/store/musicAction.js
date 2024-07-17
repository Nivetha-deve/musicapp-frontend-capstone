export const UPDATE_LIKED_STATE = 'UPDATE_LIKED_STATE';
export const SUBMIT_COMMENT = 'SUBMIT_COMMENT';
export const COMMENT_SUBMITTED = 'COMMENT_SUBMITTED';
export const COMMENT_FAILED = 'COMMENT_FAILED';
export const ADD_COMMENT = 'ADD_COMMENT';

export const updateLikedState = (index) => ({
    type: UPDATE_LIKED_STATE,
    payload: index,
  });

// export const addcomment = (comment) => ({
//   type: ADD_COMMENT,
//   payload: comment,
// }); 

export const addcomment = ({ index, comment }) => ({
  type: ADD_COMMENT,
  payload: { index, comment },
});
  
  // // Action creator to submit a comment
  // export const submitComment = ({ index, comment }) => async (dispatch) => {
  //   try {
  //     // const response = await fetch('http://localhost:8000/api/comments', {
  //       const response = await fetch('https://musicapp-backend-capstone.onrender.com/api/comments', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ index, comment }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Failed to submit comment');
  //     }
  
  //     // Dispatch an action indicating comment submission success
  //     dispatch({
  //       type: COMMENT_SUBMITTED,
  //       payload: { index, comment },
  //     });
  //   } catch (error) {
  //     console.error('Error submitting comment:', error.message);
  //     // Dispatch an action indicating comment submission failure
  //     dispatch({
  //       type: COMMENT_FAILED,
  //       payload: { error: error.message },
  //     });
  //   }
  // };

//   const initialState = {
//     // ... other initial state
//     comments: {},
//   };

// const musicReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // ... other cases
//     case ADD_COMMENT:
//       return {
//         ...state,
//         comments: {
//           ...state.comments,
//           [action.payload.index]: [
//             ...(state.comments[action.payload.index] || []),
//             action.payload.comment
//           ]
//         }
//       };
//     default:
//       return state;
//   }
// };