import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CONFIG_API_URL } from "../../constants/CONFIG";
import fakeDelay from "../../Components/fakeDelay";
import { AppDispatch } from "../../Components/redux-types";
import { setSnackbar } from "./snackbar-slice";
import getURLSearchParam from "../../utils/getURLSearchParam";

interface IUpdatePassword {
  password: string;
}

type TState = {
  data: IUpdatePassword;
  loading: boolean;
};

const initialState: TState = {
  data: {
    password: "",
  },
  loading: false,
};

export const updatePassword = createAsyncThunk(
  "users/updatePasswords",
  async (payload: IUpdatePassword, api) => {
    const dispatch = api.dispatch as AppDispatch;

    const _id = getURLSearchParam("userid");

    await fakeDelay(1000);
    try {
      const body: IUpdatePassword = {
        ...payload,
      };
      const { data } = await axios.put(
        `${CONFIG_API_URL}/api/users/update/${_id}`,
        body
      );
      dispatch(setSnackbar("Password Successfully Updated 🎉"));
      return data.user;
    } catch (err) {
      dispatch(setSnackbar("Error", { severity: "error" }));
      throw err;
    }
  }
);

export const updatePasswordSlice = createSlice({
  name: "Update Password",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ==================>Update Password<===================
    builder.addCase(updatePassword.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      updatePassword.fulfilled,
      (state, action: PayloadAction<IUpdatePassword>) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      }
    );

    builder.addCase(updatePassword.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export default updatePasswordSlice.reducer;
