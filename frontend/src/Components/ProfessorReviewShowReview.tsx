import { Stack } from "@mui/material";
import { useEffect } from "react";
import { getReviews } from "../store/slices/post-review-slice";
import ReviewComponent from "./ReviewComponent";
import { useAppDispatch, useAppSelector } from "./useReactRedux";

export default function ProfessorReviewShowReview() {
  const reviews = useAppSelector((state) => state.review.data);
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
