import { Divider, Stack, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import HeaderNavbar from './HeaderNavbar';
import ProfessorReviewHeader from './ProfessorReviewHeader';
import ProfessorReviewShowRatings from './ProfessorReviewShowRatings';
import ProfessorReviewShowReview from './ProfessorReviewShowReview';
import ProfessorReviewWriteReview from './ProfessorReviewWriteReview';
import { useAppSelector } from './useReactRedux';
import ProfessorCourse from './ProfessorCourse';

export interface IReviewLevel {
    '1-star': boolean;
    '2-star': boolean;
    '3-star': boolean;
    '4-star': boolean;
    '5-star': boolean;
}
export type TLevelName = '1-star' | '2-star' | '3-star' | '4-star' | '5-star';

export default function Review() {
    const prof_id = useAppSelector((state) => state.professor.data._id);
    const user_id = useAppSelector((state) => state.login.data._id);

    const [showLevels, setShowLevels] = useState<IReviewLevel>({
        '1-star': true,
        '2-star': true,
        '3-star': true,
        '4-star': true,
        '5-star': true,
    });
    const handleShowLevel = (name: TLevelName) => {
        setShowLevels({ ...showLevels, [name]: !showLevels[name] });
    };

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

            <ProfessorReviewHeader />
            <ProfessorCourse />

            <Divider />

            <ProfessorReviewWriteReview />
            <ProfessorReviewShowRatings
                ratingData={reviews.rating}
                showLevels={showLevels}
                handleShowLevel={handleShowLevel}
            />
            <ProfessorReviewShowReview showLevels={showLevels} reviews={reviews.reviews} />
        </StackStyle>
    );
}

const StackStyle = styled(Stack)({
    backgroundColor: '#FCFBF3',
});
