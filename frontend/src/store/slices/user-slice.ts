import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CONFIG_API_URL } from "../../constants/CONFIG";
import fakeDelay from "../../Components/fakeDelay";
import { AppDispatch } from "../../Components/redux-types";
import { setSnackbar } from "./snackbar-slice";

interface IUser {
  name: string;
  email: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}

type TState = {
  data: IUser;
  loading: boolean;
};

const initialState: TState = {
  data: {
    name: "",
    email: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
  },
  loading: false,
};

export const postUser = createAsyncThunk(
  "users/postUsers",
  async (payload: IUser, api) => {
    const dispatch = api.dispatch as AppDispatch;

    await fakeDelay(1000);

    try {
      const body: IUser = {
        ...payload,
      };
      const { data } = await axios.post(`${CONFIG_API_URL}/api/users`, body);
      dispatch(setSnackbar("Successfully Signed Up 🎉"));
      await fakeDelay(2000);
      window.location.reload();

      return data.user;
    } catch (err) {
      dispatch(setSnackbar("Email Already Exist", { severity: "error" }));
      throw err;
      
    }
  }
);

export const userSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ==================>Post User<===================
    builder.addCase(postUser.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      postUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      }
    );

    builder.addCase(postUser.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export default userSlice.reducer;
