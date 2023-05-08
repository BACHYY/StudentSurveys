import { Stack } from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';
import { getReviews } from '../store/slices/post-review-slice';
import ReviewComponent from './ReviewComponent';
import { useAppDispatch, useAppSelector } from './useReactRedux';
import { IReview } from '../store/slices/post-review-slice';
import { IReviewLevel, TLevelName } from './Review';
export default function ProfessorReviewShowReview({
    reviews,
    showLevels,
}: {
    reviews: IReview[];
    showLevels: IReviewLevel;
}) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getReviews());
    }, []);

    const assignLevelToReview = (ratingValue: number): TLevelName => {
        if (ratingValue > 0 && ratingValue < 1) {
            return '1-star';
        } else if (ratingValue > 1 && ratingValue <= 1) {
            return '2-star';
        } else if (ratingValue > 2 && ratingValue <= 2) {
            return '3-star';
        } else if (ratingValue > 3 && ratingValue <= 4) {
            return '4-star';
        } else {
            return '5-star';
        }
    };

    return (
        <Stack alignItems="center" justifyContent="center">
            {reviews.map((review, index) => {
                if (showLevels[assignLevelToReview(review.ratingValue)]) {
                    return <ReviewComponent key={index} review={review} />;
                } else {
                    return <></>;
                }
            })}
        </Stack>
    );
}
