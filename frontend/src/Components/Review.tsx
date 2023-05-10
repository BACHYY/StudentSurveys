import { Divider, Stack, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import HeaderNavbar from './HeaderNavbar';
import ProfessorReviewHeader from './ProfessorReviewHeader';
import ProfessorReviewShowRatings from './ProfessorReviewShowRatings';
import ProfessorReviewShowReview from './ProfessorReviewShowReview';
import ProfessorReviewWriteReview from './ProfessorReviewWriteReview';
import { useAppDispatch, useAppSelector } from './useReactRedux';
import ProfessorCourse from './ProfessorCourse';
import { setProfessor } from '../store/slices/professor-slice';
import { getReviews } from '../store/slices/post-review-slice';
import { CONFIG_API_URL } from '../constants/CONFIG';

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

    const dispatch = useAppDispatch();

    useEffect(() => {
        let professor_id: string;

        if (prof_id) {
            professor_id = prof_id as string;
            localStorage.setItem('prof_id', prof_id);
            if (professor_id) {
                setSearchParams({ profid: professor_id, userid: user_id });
            }
        } else {
            professor_id = localStorage.getItem('prof_id') as string;

            fetch(`${CONFIG_API_URL}/api/prof/getSingle/${professor_id}`).then((response) => {
                response.json().then((res) => {
                    dispatch(setProfessor(res));
                    setSearchParams({ profid: res._id, userid: user_id });
                });
            });
        }
        dispatch(getReviews());
    }, []);
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
            {reviews.reviews.length ? (
                <>
                    <ProfessorReviewShowRatings
                        ratingData={reviews.rating}
                        showLevels={showLevels}
                        handleShowLevel={handleShowLevel}
                    />
                    <ProfessorReviewShowReview showLevels={showLevels} reviews={reviews.reviews} />
                </>
            ) : (
                <StackStyle alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="h5">No reviews to show</Typography>
                </StackStyle>
            )}
        </StackStyle>
    );
}

const StackStyle = styled(Stack)({
    backgroundColor: '#FCFBF3',
});
