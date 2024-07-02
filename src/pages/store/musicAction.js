export const UPDATE_LIKED_STATE = 'UPDATE_LIKED_STATE';
export const SUBMIT_COMMENT = 'SUBMIT_COMMENT';
export const COMMENT_SUBMITTED = 'COMMENT_SUBMITTED';
export const COMMENT_FAILED = 'COMMENT_FAILED';
export const ADD_COMMENT = 'ADD_COMMENT';

export const updateLikedState = (index) => ({
    type: UPDATE_LIKED_STATE,
    payload: index,
  });

export const addcomment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});  
  
  // Action creator to submit a comment
  export const submitComment = ({ index, comment }) => async (dispatch) => {
    try {
      // Example: Send a request to the server to submit the comment
      const response = await fetch('http://localhost:8000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index, comment }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
  
      // Dispatch an action indicating comment submission success
      dispatch({
        type: COMMENT_SUBMITTED,
        payload: { index, comment },
      });
    } catch (error) {
      console.error('Error submitting comment:', error.message);
      // Dispatch an action indicating comment submission failure
      dispatch({
        type: COMMENT_FAILED,
        payload: { error: error.message },
      });
    }
  };