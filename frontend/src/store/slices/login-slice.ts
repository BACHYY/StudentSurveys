import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import fakeDelay from "../../Components/fakeDelay";
import { AppDispatch } from "../../Components/redux-types";
import { CONFIG_API_URL } from "../../constants/CONFIG";
import { setSnackbar } from "./snackbar-slice";

interface IUserLogin {
  email: string;
  password: string;
  // token: string;
}

interface IData {
  email: string;
  securityQuestion: string;
  isAdmin: boolean;
  name: string;
  token: string;
  _id: string;
}
type TState = {
  data: IData;
  loading: boolean;
};

const initialState: TState = {
  data: {
    email: "",
    securityQuestion: "",
    isAdmin: false,
    name: "",
    token: "",
    _id: "",
  },
  loading: false,
};

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload: IUserLogin, api) => {
    const dispatch = api.dispatch as AppDispatch;

    await fakeDelay(1000);
    try {
      const body: IUserLogin = {
        ...payload,
      };
      const { data } = await axios.post(
        `${CONFIG_API_URL}/api/users/login`,
        body
      );
      dispatch(setSnackbar("Successfully Signed In 🎉"));

      return data as IData;
    } catch (err) {
      dispatch(setSnackbar("Invalid email or password", { severity: "error" }));
      throw err;
    }
  }
);

export const userLoginSlice = createSlice({
  name: "Users login",
  initialState,
  reducers: {
    setLogout: () => initialState,
  },
  extraReducers: (builder) => {
    // ==================>Post User<===================
    builder.addCase(loginUser.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<IData>) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      }
    );

    builder.addCase(loginUser.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export default userLoginSlice.reducer;
export const { setLogout } = userLoginSlice.actions;
