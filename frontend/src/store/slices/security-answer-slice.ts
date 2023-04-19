import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import fakeDelay from "../../Components/fakeDelay";
import { AppDispatch } from "../../Components/redux-types";
import { CONFIG_API_URL } from "../../constants/CONFIG";
import getURLSearchParam from "../../utils/getURLSearchParam";
import { setSnackbar } from "./snackbar-slice";

interface ISecurityAnswer {
  securityAnswer: string;
}

type TState = {
  data: ISecurityAnswer;
  loading: boolean;
  Answer: boolean;
};

const initialState: TState = {
  data: {
    securityAnswer: "",
  },
  loading: false,
  Answer: false,
};

export const securityAnswer = createAsyncThunk(
  "users/securityAnswers",
  async (payload: ISecurityAnswer, api) => {
    const dispatch = api.dispatch as AppDispatch;
    const _id = getURLSearchParam("userid");

    await fakeDelay(1000);
    try {
      const body: ISecurityAnswer = {
        ...payload,
      };
      const { data } = await axios.post(
        `${CONFIG_API_URL}/api/password/verify/${_id}`,
        body
      );
      dispatch(setSnackbar("Right Answer 🎉"));
      return data;
    } catch (err) {
      dispatch(setSnackbar("Wrong Answer", { severity: "error" }));
      throw err;
    }
  }
);

export const securityAnswerSlice = createSlice({
  name: "Security Answer",
  initialState,
  reducers: {
    setSecurityAnswer: () => initialState,
  },
  extraReducers: (builder) => {
    // ==================>Security Answer <===================
    builder.addCase(securityAnswer.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      securityAnswer.fulfilled,
      (state, action: PayloadAction<ISecurityAnswer>) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          Answer: true,
        };
      }
    );

    builder.addCase(securityAnswer.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export default securityAnswerSlice.reducer;
export const { setSecurityAnswer } = securityAnswerSlice.actions;
