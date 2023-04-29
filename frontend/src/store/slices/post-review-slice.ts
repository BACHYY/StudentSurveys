import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import fakeDelay from "../../Components/fakeDelay";
import { AppDispatch, RootState } from "../../Components/redux-types";
import { CONFIG_API_URL } from "../../constants/CONFIG";
import getURLSearchParam from "../../utils/getURLSearchParam";
import { setSnackbar } from "./snackbar-slice";

interface IVote {
  voteType: string;
  reviewId: string;
}

interface IComment {
  comment: string;
  profName: string;
}

interface IReply {
  _id: string;
  name: string;
  comment: string;
  upVotes: number;
  downVotes: number;
}

export interface IReview {
  _id: string;
  comment: string;
  profName: string;
  upVotes: number;
  downVotes: number;
  name: string;
  user: string;
  replies: IReply[];
}

type TState = {
  data: IReview[];
  loading: boolean;
};

const initialState: TState = {
  data: [],
  loading: false,
};

export const getReviews = createAsyncThunk(
  "users/getReviews",
  async (_, api) => {
    const dispatch = api.dispatch as AppDispatch;
    await fakeDelay(1000);
    try {
      const _id = getURLSearchParam("profid");

      const { data } = await axios.get(
        `${CONFIG_API_URL}/api/reviews/professorReviews/${_id}`
      );

      return data.reviews;
    } catch (err) {
      dispatch(setSnackbar("Error fetching data", { severity: "error" }));
      throw err;
    }
  }
);

export const getUserReviews = createAsyncThunk(
  "users/getUserReviews",
  async (_, api) => {
    const dispatch = api.dispatch as AppDispatch;
    await fakeDelay(1000);
    try {
      const _id = getURLSearchParam("userid");

      const { data } = await axios.get(
        `${CONFIG_API_URL}/api/reviews/userReviews/${_id}`
      );

      return data.reviews;
    } catch (err) {
      dispatch(setSnackbar("Error fetching data", { severity: "error" }));
      throw err;
    }
  }
);

export const postVote = createAsyncThunk(
  "users/postVote",
  async ({ reviewId, voteType }: IVote, api) => {
    const dispatch = api.dispatch as AppDispatch;
    await fakeDelay(1000);

    try {
      const _id = getURLSearchParam("profid");

      const { data } = await axios.put(
        `${CONFIG_API_URL}/api/reviews/vote/${_id}/${reviewId}?voteType=${voteType}`
      );

      dispatch(setSnackbar("Voted Successfully 🎉 "));
      return data;
    } catch (err) {
      dispatch(setSnackbar("Error", { severity: "error" }));
      throw err;
    }
  }
);

export const postComment = createAsyncThunk(
  "users/postComment",
  async ({ comment, profName }: IComment, api) => {
    const dispatch = api.dispatch as AppDispatch;
    await fakeDelay(1000);

    try {
      const _id = getURLSearchParam("profid");
      const token = (api.getState() as RootState).login.data.token;

      const body = {
        comment,
        profName,
      };
      const { data } = await axios.post(
        `${CONFIG_API_URL}/api/prof/${_id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setSnackbar("Comment Successfully Posted 🎉 "));
      return data;
    } catch (err) {
      dispatch(setSnackbar("Error", { severity: "error" }));
      throw err;
    }
  }
);

export const Review = createSlice({
  name: "Review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ==================>Post Comment<===================
    builder.addCase(postComment.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      postComment.fulfilled,
      (state, action: PayloadAction<IReview>) => {
        return {
          ...state,
          data: state.data.concat(action.payload),
          loading: false,
        };
      }
    );

    builder.addCase(postComment.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });

    // ==================>Get Reviews<===================

    builder.addCase(getReviews.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      getReviews.fulfilled,
      (state, action: PayloadAction<IReview[]>) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      }
    );

    builder.addCase(getReviews.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });

    // ==================>Get User Reviews<===================

    builder.addCase(getUserReviews.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      getUserReviews.fulfilled,
      (state, action: PayloadAction<IReview[]>) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      }
    );
    builder.addCase(getUserReviews.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });

    // ==================>Post Vote<===================
    builder.addCase(postVote.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      postVote.fulfilled,
      (state, action: PayloadAction<IReview>) => {
        return {
          ...state,
          data: state.data.concat(action.payload),
          loading: false,
        };
      }
    );

    builder.addCase(postVote.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export default Review.reducer;
