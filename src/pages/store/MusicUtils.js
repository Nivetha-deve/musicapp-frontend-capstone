import { submitComment, updateLikedState } from "./musicAction";


export const handleLikeSong = (dispatch, index) => {
    dispatch(updateLikedState(index));
    console.log(`Liked song at index ${index}`);
  };
  
  // Function to handle submitting a comment for a song
  export const handleCommentSubmit = (dispatch, index, comment) => {
    dispatch(submitComment({ index, comment }));
    console.log(`Comment for song at index ${index}: ${comment}`);
  };
