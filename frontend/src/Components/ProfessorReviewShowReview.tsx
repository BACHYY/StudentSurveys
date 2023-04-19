import {
  BookmarkBorderOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useEffect, useMemo } from "react";
import { getReviews } from "../store/slices/post-review-slice";
import ProfessorRating from "./ProfessorRating";
import { useAppDispatch, useAppSelector } from "./useReactRedux";

export default function ProfessorReviewShowReview() {
  const dispatch = useAppDispatch();
  const review = useAppSelector((state) => state.review.data);

  useEffect(() => {
    dispatch(getReviews());
  }, []);



  
  return (
    <Stack alignItems="center" justifyContent="center">
      {review.map((review, index) => (
        <PaperStyle2 elevation={3} key={index}>
          <StackStyle spacing={2}>
            <StackStyle1 flexDirection="row">
              <Avatar
                alt={review.name}
                src="/broken-image.jpg"
                sx={{ bgcolor: deepPurple[500] }}
              />

              <Stack>
                <Typography>{review.name}</Typography>
                <Typography color="GrayText">1 Review</Typography>
              </Stack>
            </StackStyle1>
            <Divider />
            <Stack flexDirection="row" justifyContent="space-between">
              <ProfessorRating />
            </Stack>

            <Stack>
              <Typography>{review.comment}</Typography>
            </Stack>
            <Divider />
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <StackStyle2 flexDirection="row" alignItems="center">
                <IconButton title="like">
                  <ThumbUpOutlined />
                </IconButton>
                <IconButton title="dislike">
                  <ThumbDownOutlined />
                </IconButton>
              </StackStyle2>
              <IconButton title="bookmark">
                <BookmarkBorderOutlined />
              </IconButton>
            </Stack>
            <TextField
              id="outlined-basic"
              label="Reply Here"
              variant="outlined"
            />
          </StackStyle>

          <StackStyle3 alignItems="center">
            <Button variant="contained" size="small">
              {" "}
              Reply
            </Button>
          </StackStyle3>
        </PaperStyle2>
      ))}
    </Stack>
  );
}

const PaperStyle2 = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px",
  width: "700px",
  margin: "30px",
});

const StackStyle = styled(Stack)({
  padding: "20px",
});

const StackStyle1 = styled(Stack)({
  gap: "10px",
});

const StackStyle2 = styled(Stack)({
  gap: "20px",
});

const StackStyle3 = styled(Stack)({
  padding: "10px",
});
