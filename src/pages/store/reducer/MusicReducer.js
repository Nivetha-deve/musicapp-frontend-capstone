import { UPDATE_LIKED_STATE, COMMENT_SUBMITTED, COMMENT_FAILED} from "../musicAction.js"

// Initial state
const initialState = {
  likedSongs: [], // Array to hold liked song indices
  comment: {}, // Object to hold comments for each song indexed by song index
  error: null, // Error state for comment submission
};

// Reducer function
const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LIKED_STATE:
      return {
        ...state,
        likedSongs: state.likedSongs.includes(action.payload)
          ? state.likedSongs.filter((index) => index !== action.payload) // Unlike if already liked
          : [...state.likedSongs, action.payload], // Like the song
      };

    case COMMENT_SUBMITTED: {
      const { index, comment } = action.payload;
      return {
        ...state,
        comments: {
          ...state.comment,
          [index]: comment,
        },
        error: null, // Clear error on successful comment submission
      };
    }

    case COMMENT_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};


export default musicReducer;
