import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { getReviews } from '../store/slices/post-review-slice';
import ReviewComponent from './ReviewComponent';
import { useAppDispatch, useAppSelector } from './useReactRedux';
import { IReview } from '../store/slices/post-review-slice';
export default function ProfessorReviewShowReview({ reviews }: { reviews: IReview[] }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getReviews());
    }, []);

    return (
        <Stack alignItems="center" justifyContent="center">
            {reviews.map((review, index) => (
                <ReviewComponent key={index} review={review} />
            ))}
        </Stack>
    );
}
