import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import fakeDelay from "../../Components/fakeDelay";
import { AppDispatch } from "../../Components/redux-types";
import { CONFIG_API_URL } from "../../constants/CONFIG";
import getURLSearchParam from "../../utils/getURLSearchParam";
import { setSnackbar } from "./snackbar-slice";

interface IName {
  reviewId: string;
  profName: string;
}

interface IReply {
  _id: string;
  comment: string;
  name: string;
  upVotes: number;
  downVotes: number;
}
interface IBookmark {
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
  data: IBookmark[];
  loading: boolean;
};

const initialState: TState = {
  data: [],
  loading: false,
};

export const getUserBookmarks = createAsyncThunk(
  "users/getUserBookmarks",
  async (_, api) => {
    const dispatch = api.dispatch as AppDispatch;
    await fakeDelay(1000);
    try {
      const _id = getURLSearchParam("userid");

      const { data } = await axios.get(
        `${CONFIG_API_URL}/api/bookmarks/reviews/${_id}`
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
  async ({ reviewId, profName }: IName, api) => {
    const dispatch = api.dispatch as AppDispatch;
    await fakeDelay(1000);

    try {
      const userId = getURLSearchParam("userid");
      const body = {
        profName,
      };
      const { data } = await axios.post(
        `${CONFIG_API_URL}/api/bookmarks/reviews/${userId}/${reviewId}`,
        body
      );
      dispatch(setSnackbar("Bookmarked Successfully  🎉 "));
      return data;
    } catch (err) {
      dispatch(setSnackbar("Error", { severity: "error" }));
      throw err;
    }
  }
);

export const BookmarkSlice = createSlice({
  name: "Bookmark",
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
      (state, action: PayloadAction<IBookmark>) => {
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

    // ==================>Get User Reviews<===================

    builder.addCase(getUserBookmarks.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      getUserBookmarks.fulfilled,
      (state, action: PayloadAction<IBookmark[]>) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      }
    );

    builder.addCase(getUserBookmarks.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export default BookmarkSlice.reducer;
