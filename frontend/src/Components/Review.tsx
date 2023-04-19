import { Divider, Stack, styled } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import HeaderNavbar from "./HeaderNavbar";
import ProfessorReviewHeader from "./ProfessorReviewHeader";
import ProfessorReviewShowRatings from "./ProfessorReviewShowRatings";
import ProfessorReviewShowReview from "./ProfessorReviewShowReview";
import ProfessorReviewWriteReview from "./ProfessorReviewWriteReview";
import { useAppSelector } from "./useReactRedux";

export default function Review() {
  const prof_id = useAppSelector((state) => state.professor.data._id);
  const user_id = useAppSelector((state) => state.login.data._id);

  const { pathname } = useLocation();

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!prof_id) return;
    setSearchParams({ profid: prof_id });
  }, [prof_id, pathname]);

  return (
    <StackStyle>
      <HeaderNavbar />

      <ProfessorReviewHeader />

      <Divider />

      <ProfessorReviewWriteReview />
      <ProfessorReviewShowRatings />
      <ProfessorReviewShowReview />
    </StackStyle>
  );
}

const StackStyle = styled(Stack)({
  backgroundColor: "#FCFBF3",
});
