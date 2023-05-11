import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import fakeDelay from '../../Components/fakeDelay';
import { AppDispatch } from '../../Components/redux-types';
import { CONFIG_API_URL } from '../../constants/CONFIG';
import getURLSearchParam from '../../utils/getURLSearchParam';
import { setSnackbar } from './snackbar-slice';
import { setProfessor } from './professor-slice';

interface IComment {
    comment: string;
    reviewId: string;
    name: string;
}

interface IReply {
    comment: string;
    name: string;
    upVotes: number;
    downVotes: number;
}

type TState = {
    data: IReply[];
    loading: boolean;
};

const initialState: TState = {
    data: [],
    loading: false,
};

export const postReply = createAsyncThunk('users/postReply', async ({ reviewId, comment, name }: IComment, api) => {
    const dispatch = api.dispatch as AppDispatch;
    await fakeDelay(1000);
    const body = {
        comment,
        name,
    };
    try {
        const _id = getURLSearchParam('profid');

        const { data } = await axios.put(`${CONFIG_API_URL}/api/reviews/reply/${_id}/${reviewId}`, body);

        dispatch(setSnackbar('Reply Successfully Posted 🎉 '));
        return data;
    } catch (err) {
        dispatch(setSnackbar('Error', { severity: 'error' }));
        throw err;
    }
});

export const ReplySlice = createSlice({
    name: 'Reply',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ==================>Post Comment<===================
        builder.addCase(postReply.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        });

        builder.addCase(postReply.fulfilled, (state, action: PayloadAction<IReply>) => {
            return {
                ...state,
                data: state.data.concat(action.payload),
                loading: false,
            };
        });

        builder.addCase(postReply.rejected, (state) => {
            return {
                ...state,
                loading: false,
            };
        });
    },
});

export default ReplySlice.reducer;
