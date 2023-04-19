import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CONFIG_API_URL } from "../../constants/CONFIG";
import fakeDelay from "../../Components/fakeDelay";
import { AppDispatch } from "../../Components/redux-types";
import { setSnackbar } from "./snackbar-slice";
import getURLSearchParam from "../../utils/getURLSearchParam";

interface IUpdateUser {
  name: string;
  email: string;
}

type TState = {
  data: IUpdateUser;
  loading: boolean;
};

const initialState: TState = {
  data: {
    name: "",
    email: "",
  },
  loading: false,
};

export const updateUser = createAsyncThunk(
  "users/updateUsers",
  async (payload: IUpdateUser, api) => {
    const dispatch = api.dispatch as AppDispatch;

    const _id = getURLSearchParam("userid");

    await fakeDelay(1000);
    try {
      const body: IUpdateUser = {
        ...payload,
      };
      const { data } = await axios.put(
        `${CONFIG_API_URL}/api/users/${_id}`,
        body
      );
      dispatch(setSnackbar("User Successfully Updated 🎉"));
      return data.user;
    } catch (err) {
      dispatch(setSnackbar("Error", { severity: "error" }));
      throw err;
    }
  }
);

export const updateUserSlice = createSlice({
  name: "Update User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ==================>Update User<===================
    builder.addCase(updateUser.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<IUpdateUser>) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      }
    );

    builder.addCase(updateUser.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export default updateUserSlice.reducer;
