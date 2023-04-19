import {
  Box,
  Button,
  Paper,
  Rating,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { postComment } from "../store/slices/post-review-slice";
import ActivityIndicator from "./ActivityIndicator";
import FeedbackRating from "./FeedbackRating";
import { useAppDispatch, useAppSelector } from "./useReactRedux";
import StarIcon from "@mui/icons-material/Star";

export default function ProfessorReviewWriteReview() {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState("");
  const loading = useAppSelector((state) => state.review.loading);

  const onSubmit = async () => {
    try {
      dispatch(postComment(comment));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PaperStyle variant="outlined" square>
      <StackStyle1 flexDirection="row" alignItems="center">
        <ImageStyle1
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsjsq5P9lqOxc-k4efzNXBbx7v4pB4ydrWb7VFfEk&s"
          alt="img"
        />

        <ActivityIndicator loading={loading} />

        <TextField
          label="Write a Review"
          variant="outlined"
          sx={{ width: "700px" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Stack>
          <FeedbackRating />
        </Stack>
        <Button variant="contained" onClick={onSubmit}>
          Post
        </Button>
      </StackStyle1>
    </PaperStyle>
  );
}

const StackStyle1 = styled(Stack)({
  gap: "20px",
});

const PaperStyle = styled(Paper)({
  height: "80px",
  padding: "30px 100px",
  margin: "30px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const ImageStyle1 = styled("img")({
  height: "30px",
  width: "30px",
  borderRadius: "50%",
});
