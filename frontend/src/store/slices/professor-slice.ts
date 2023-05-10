import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import fakeDelay from '../../Components/fakeDelay';
import { AppDispatch } from '../../Components/redux-types';
import { CONFIG_API_URL } from '../../constants/CONFIG';
import { setSnackbar } from './snackbar-slice';

export interface ICourse {
    _id?: string;
    courseName: string;
    courseCount: number;
}
export interface IProf {
    _id?: string;
    name: string;
    school: string;
    department: string;
    courses?: ICourse[];
}

type TState = {
    data: IProf;
    loading: boolean;
};

const initialState: TState = {
    data: {
        _id: '',
        name: '',
        school: '',
        department: '',
        courses: [],
    },
    loading: false,
};

export const postProf = createAsyncThunk('users/postProf', async (payload: IProf, api) => {
    const dispatch = api.dispatch as AppDispatch;
    await fakeDelay(1000);

    try {
        const body: IProf = {
            ...payload,
        };
        const { data } = await axios.post(`${CONFIG_API_URL}/api/prof`, body);
        dispatch(setSnackbar('Professor Successfully created 🎉 '));
        await fakeDelay(2000);
        window.location.reload();

        return data.professor;
    } catch (err) {
        dispatch(setSnackbar('Professor Already Exist', { severity: 'error' }));
        throw err;
    }
});

export const profSlice = createSlice({
    name: 'Professors',
    initialState,
    reducers: {
        setProfessor: (state, action: PayloadAction<IProf>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        // ==================>Post User<===================
        builder.addCase(postProf.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        });

        builder.addCase(postProf.fulfilled, (state, action: PayloadAction<IProf>) => {
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        });

        builder.addCase(postProf.rejected, (state) => {
            return {
                ...state,
                loading: false,
            };
        });
    },
});

export default profSlice.reducer;
export const { setProfessor } = profSlice.actions;
