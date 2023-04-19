import { ThumbDownOutlined, ThumbUpOutlined } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useEffect } from "react";
import { getUserReviews } from "../store/slices/post-review-slice";
import ProfessorRating from "./ProfessorRating";
import { useAppDispatch, useAppSelector } from "./useReactRedux";

export default function SettingsUserReviews() {
  const { data } = useAppSelector((state) => state.login);

  const dispatch = useAppDispatch();
  const review = useAppSelector((state) => state.review.data);

  useEffect(() => {
    dispatch(getUserReviews());
  }, []);

  return (
    <Stack alignItems="center" justifyContent="center">
      {review.map((review, index) => (
        <PaperStyle2 elevation={3} key={index}>
          <StackStyle spacing={2}>
            <StackStyle1 flexDirection="row">
              <Avatar
                sx={{ bgcolor: deepPurple[400] }}
                alt={data.name}
                src="/broken-image.jpg"
              />
              <Stack>
                <Typography>{data.name}</Typography>
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
            </Stack>
          </StackStyle>
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
