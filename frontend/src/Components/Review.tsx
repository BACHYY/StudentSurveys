import { Divider, Stack, styled } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import HeaderNavbar from './HeaderNavbar';
import ProfessorReviewHeader from './ProfessorReviewHeader';
import ProfessorReviewShowRatings from './ProfessorReviewShowRatings';
import ProfessorReviewShowReview from './ProfessorReviewShowReview';
import ProfessorReviewWriteReview from './ProfessorReviewWriteReview';
import { useAppSelector } from './useReactRedux';

export default function Review() {
    const prof_id = useAppSelector((state) => state.professor.data._id);
    const user_id = useAppSelector((state) => state.login.data._id);

    const { pathname } = useLocation();

    const [, setSearchParams] = useSearchParams();

    const reviews = useAppSelector((state) => state.review.data);

    useEffect(() => {
        if (!prof_id) return;
        setSearchParams({ userid: user_id, profid: prof_id });
    }, [user_id, prof_id, pathname]);

    return (
        <StackStyle>
            <HeaderNavbar />

            <ProfessorReviewHeader  />

            <Divider />

            <ProfessorReviewWriteReview />
            <ProfessorReviewShowRatings {...reviews.rating} />
            <ProfessorReviewShowReview reviews={reviews.reviews} />
        </StackStyle>
    );
}

const StackStyle = styled(Stack)({
    backgroundColor: '#FCFBF3',
});
