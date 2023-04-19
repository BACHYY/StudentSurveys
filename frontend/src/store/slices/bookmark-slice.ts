import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import fakeDelay from "../../Components/fakeDelay";
import { AppDispatch } from "../../Components/redux-types";
import { CONFIG_API_URL } from "../../constants/CONFIG";
import getURLSearchParam from "../../utils/getURLSearchParam";
import { setSnackbar } from "./snackbar-slice";

interface IReply {
  _id: string;
  comment: string;
  upVotes: number;
  downVotes: number;
}

interface IReview {
  _id: string;
  comment: string;
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

export const postBookmark = createAsyncThunk(
  "users/postBookmark",
  async (comment: string, api) => {
    const dispatch = api.dispatch as AppDispatch;
    await fakeDelay(1000);

    try {
      const _id = getURLSearchParam("userid");

      const body = {
        comment,
      };
      const { data } = await axios.post(
        `${CONFIG_API_URL}/api/bookmarks/reviews/${_id}`,
        body
      );

      dispatch(setSnackbar("Bookmarked Successfully 🎉 "));
      return data.user;
    } catch (err) {
      dispatch(setSnackbar("Error", { severity: "error" }));
      throw err;
    }
  }
);

export const BookmarkSlice = createSlice({
  name: "BookmarkSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ==================>Post Bookmark<===================
    builder.addCase(postBookmark.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      postBookmark.fulfilled,
      (state, action: PayloadAction<IReview>) => {
        return {
          ...state,
          data: state.data.concat(action.payload),
          loading: false,
        };
      }
    );

    builder.addCase(postBookmark.rejected, (state) => {
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
  },
});

export default BookmarkSlice.reducer;
