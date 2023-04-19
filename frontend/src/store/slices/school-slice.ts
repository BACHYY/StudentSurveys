import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CONFIG_API_URL } from "../../constants/CONFIG";
import fakeDelay from "../../Components/fakeDelay";
import { AppDispatch } from "../../Components/redux-types";
import { setSnackbar } from "./snackbar-slice";

interface ISchool {
  name: string;
  city: string;
  state: string;
  country: string;
}

type TState = {
  data: ISchool;
  loading: boolean;
};

const initialState: TState = {
  data: {
    name: "",
    city: "",
    state: "",
    country: "",
  },
  loading: false,
};

export const postSchool = createAsyncThunk(
  "school/postSchool",
  async (payload: ISchool, api) => {
    const dispatch = api.dispatch as AppDispatch;

    await fakeDelay(1000);
    try {
      const body: ISchool = {
        ...payload,
      };
      const { data } = await axios.post(`${CONFIG_API_URL}/api/school`, body);
      dispatch(setSnackbar("Successfully Registered School 🎉"));
      await fakeDelay(2000);
      window.location.reload();

      return data.user;
    } catch (err) {
      dispatch(
        setSnackbar("Error, School Already Registered", { severity: "error" })
      );
      throw err;
    }
  }
);

export const registerSchoolSlice = createSlice({
  name: "School",
  initialState,
  reducers: {
    setSchool: (state, action: PayloadAction<ISchool>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ==================>Post School<===================
    builder.addCase(postSchool.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(
      postSchool.fulfilled,
      (state, action: PayloadAction<ISchool>) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      }
    );

    builder.addCase(postSchool.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export default registerSchoolSlice.reducer;
// export const { setSchool } = registerSchoolSlice.actions;
