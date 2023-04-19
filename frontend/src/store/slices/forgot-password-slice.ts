import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import fakeDelay from "../../Components/fakeDelay";
import { AppDispatch } from "../../Components/redux-types";
import { CONFIG_API_URL } from "../../constants/CONFIG";
import { setSnackbar } from "./snackbar-slice";

interface IForgotPass {
  email: string;
}

interface IData {
  securityQuestion: string;
  _id: string;
}
type TState = {
  data: IData;
  loading: boolean;
  Answer:boolean
};

const initialState: TState = {
  data: {
    securityQuestion: "",
    _id: "",
  },
  loading: false,
    Answer:false
};

export const forgotPass = createAsyncThunk(
  "users/forgotPass",
  async (payload: IForgotPass, api) => {
    const dispatch = api.dispatch as AppDispatch;

    await fakeDelay(1000);
    try {
      const body: IForgotPass = {
        ...payload,
      };
      const { data } = await axios.post(
        `${CONFIG_API_URL}/api/users/forgotpassword`,
        body
      );
      dispatch(setSnackbar("Right Email 🎉"));

      return data as IData;
    } catch (err) {
      dispatch(setSnackbar("Wrong Email", { severity: "error" }));
      throw err;
    }
  }
);

export const forgotPassSlice = createSlice({
  name: "forgot Password",
  initialState,
  reducers: {
    setEmail: () => initialState,

  },
  extraReducers: (builder) => {
    // ==================>Forgot Pass<===================
    builder.addCase(forgotPass.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      forgotPass.fulfilled,
      (state, action: PayloadAction<IData>) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          Answer:true
        };
      }
    );

    builder.addCase(forgotPass.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export default forgotPassSlice.reducer;
export const { setEmail } = forgotPassSlice.actions;