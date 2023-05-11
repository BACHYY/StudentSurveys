import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import fakeDelay from '../../Components/fakeDelay';
import { AppDispatch, RootState } from '../../Components/redux-types';
import { CONFIG_API_URL } from '../../constants/CONFIG';
import getURLSearchParam from '../../utils/getURLSearchParam';
import { setSnackbar } from './snackbar-slice';
import { TLevelName } from '../../Components/Review';
import { useAppSelector } from '../../Components/useReactRedux';

interface IVote {
    voteType: string;
    reviewId: string;
}

interface IComment {
    comment: string;
    profName: string;
    value: number | null;
}

export interface IDelete {
    profId: string | undefined;
    reviewId: string;
}

interface IReply {
    _id: string;
    name: string;
    comment: string;
    upVotes: number;
    downVotes: number;
}

export interface Irating {
    total: number;
    averageRating: number;
    options: {
        title: TLevelName;
        rating_percentage: number;
    }[];
}

export interface IReview {
    _id: string;
    comment: string;
    profName: string;
    upVotes: number;
    downVotes: number;
    name: TLevelName;
    user: string;
    ratingValue: number;
    replies: IReply[];
}

type TData = {
    reviews: IReview[];
    rating: Irating;
};
type TState = {
    data: TData;
    loading: boolean;
};

const initialState: TState = {
    data: {
        reviews: [],
        rating: {
            total: 0,
            averageRating: 5,
            options: [
                { title: '1-star', rating_percentage: 100 },
                { title: '2-star', rating_percentage: 100 },
                { title: '3-star', rating_percentage: 100 },
                { title: '4-star', rating_percentage: 100 },
                { title: '5-star', rating_percentage: 100 },
            ],
        },
    },
    loading: false,
};

export const getReviews = createAsyncThunk('users/getReviews', async (_, api) => {
    const dispatch = api.dispatch as AppDispatch;
    await fakeDelay(1000);
    try {
        let _id;
        _id = getURLSearchParam('profid');
        if (_id) {
            _id = localStorage.getItem('prof_id');
        }

        const { data } = await axios.get(`${CONFIG_API_URL}/api/reviews/professorReviews/${_id}`);

        return data;
    } catch (err) {
        dispatch(setSnackbar('Error fetching data', { severity: 'error' }));
        throw err;
    }
});

export const deleteReview = createAsyncThunk('reviews/deleteReview', async ({ profId, reviewId }: IDelete, api) => {
    await fakeDelay(1000);
    const dispatch = api.dispatch as AppDispatch;
    const data = { reviewId, profId };

    const token = (api.getState() as RootState).login.data.token;
    try {
        await axios.delete(`${CONFIG_API_URL}/api/reviews/${profId}/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(setSnackbar('Review deleted successfully', { severity: 'success' }));
        return data;
    } catch (err) {
        dispatch(setSnackbar('Error deleting review', { severity: 'error' }));
        throw err;
    }
});

export const getUserReviews = createAsyncThunk('users/getUserReviews', async (_, api) => {
    const dispatch = api.dispatch as AppDispatch;
    await fakeDelay(1000);
    try {
        const _id = getURLSearchParam('userid');

        const { data } = await axios.get(`${CONFIG_API_URL}/api/reviews/userReviews/${_id}`);

        return data.reviews;
    } catch (err) {
        dispatch(setSnackbar('Error fetching data', { severity: 'error' }));
        throw err;
    }
});

export const postVote = createAsyncThunk('users/postVote', async ({ reviewId, voteType }: IVote, api) => {
    const dispatch = api.dispatch as AppDispatch;
    await fakeDelay(1000);
    const token = (api.getState() as RootState).login.data.token;

    try {
        const _id = getURLSearchParam('profid');

        const { data } = await axios.put(
            `${CONFIG_API_URL}/api/reviews/vote/${_id}/${reviewId}?voteType=${voteType}`,

            null,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        dispatch(setSnackbar('Voted Successfully 🎉 '));
        return data.review;
    } catch (err: any) {
        dispatch(setSnackbar(err?.response?.data.message || 'Error', { severity: 'error' }));
        throw err;
    }
});

export const postComment = createAsyncThunk(
    'users/postComment',
    async ({ comment, profName, value }: IComment, api) => {
        const dispatch = api.dispatch as AppDispatch;
        await fakeDelay(1000);

        try {
            const _id = getURLSearchParam('profid');
            const token = (api.getState() as RootState).login.data.token;

            const body = {
                comment,
                profName,
                value,
            };
            const { data } = await axios.post(`${CONFIG_API_URL}/api/prof/${_id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
            });

            dispatch(setSnackbar('Comment Successfully Posted 🎉 '));
            return data;
        } catch (err: any) {
            dispatch(setSnackbar(err.response?.data.message || 'message', { severity: 'error' }));
            throw err;
        }
    }
);

export const Review = createSlice({
    name: 'Review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ==================>Post Comment<===================
        builder.addCase(postComment.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        });

        builder.addCase(postComment.fulfilled, (state, action: PayloadAction<IReview>) => {
            return {
                ...state,

                data: { ...state.data, reviews: state.data.reviews.concat(action.payload) },
                loading: false,
            };
        });

        builder.addCase(postComment.rejected, (state) => {
            return {
                ...state,
                loading: false,
            };
        });

        // ==================>Get Reviews<===================

        builder.addCase(getReviews.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        });

        builder.addCase(getReviews.fulfilled, (state, action: PayloadAction<TData>) => {
            return {
                ...state,
                data: { ...state.data, reviews: action.payload.reviews, rating: action.payload.rating },
                loading: false,
            };
        });

        builder.addCase(getReviews.rejected, (state) => {
            return {
                ...state,
                loading: false,
            };
        });

        // ==================>delete Reviews<===================

        builder.addCase(deleteReview.pending, (state) => {
            return { ...state, loading: true };
        });

        builder.addCase(deleteReview.fulfilled, (state, action: PayloadAction<IDelete>) => {
            const newData = state.data.reviews.filter((review) => review._id !== action.payload.reviewId);
            return { ...state, data: { ...state.data, reviews: newData }, loading: false };
        });

        builder.addCase(deleteReview.rejected, (state) => {
            return { ...state, loading: false };
        });

        // ==================>Get User Reviews<===================

        builder.addCase(getUserReviews.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        });

        builder.addCase(getUserReviews.fulfilled, (state, action: PayloadAction<IReview[]>) => {
            return {
                ...state,
                data: { ...state.data, reviews: action.payload },
                loading: false,
            };
        });
        builder.addCase(getUserReviews.rejected, (state) => {
            return {
                ...state,
                loading: false,
            };
        });

        // ==================>Post Vote<===================
        builder.addCase(postVote.pending, (state) => {
            return {
                ...state,
                loading: true,
            };
        });

        builder.addCase(postVote.fulfilled, (state, action: PayloadAction<IReview>) => {
            const newReviews = state.data.reviews.map((review) => {
                if (review._id === action.payload._id) {
                    return action.payload;
                } else {
                    return review;
                }
            });
            return {
                ...state,
                data: { ...state.data, reviews: newReviews },
                loading: false,
            };
        });

        builder.addCase(postVote.rejected, (state) => {
            return {
                ...state,
                loading: false,
            };
        });
    },
});

export default Review.reducer;
