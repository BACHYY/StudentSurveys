import { ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';
import { Avatar, Divider, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useEffect } from 'react';
import { getUserReviews } from '../store/slices/post-review-slice';
import ProfessorRating from './ProfessorRating';
import { useAppDispatch, useAppSelector } from './useReactRedux';

export default function SettingsUserReviews() {
    const { data } = useAppSelector((state) => state.login);

    const dispatch = useAppDispatch();
    const review = useAppSelector((state) => state.review.data);

    useEffect(() => {
        dispatch(getUserReviews());
    }, []);

    return (
        <Stack alignItems="center" justifyContent="center">
            {review.reviews.map((review, index) => (
                <PaperStyle2 elevation={3} key={index}>
                    <StackStyle spacing={2}>
                        <StackStyle1 flexDirection="row" alignItems="center" justifyContent="space-between">
                            <Stack flexDirection="row" alignItems="center" sx={{ gap: '10px' }}>
                                <Avatar sx={{ bgcolor: deepPurple[400] }} alt={review.name} src="/broken-image.jpg" />
                                <Typography>{review.name}</Typography>
                            </Stack>
                            <Stack flexDirection="row" alignItems="center">
                                <Typography sx={{ fontWeight: 'bold' }}>Professor: </Typography>

                                <Typography variant="subtitle1" color="GrayText">
                                    {review.profName}
                                </Typography>
                            </Stack>
                        </StackStyle1>
                        <Divider />
                        <Stack flexDirection="row" justifyContent="space-between">
                            {/* <ProfessorRating /> */}
                        </Stack>

                        <Stack>
                            <Typography>{review.comment}</Typography>
                        </Stack>
                        <Divider />
                        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                            <StackStyle2 flexDirection="row" alignItems="center">
                                <TypographyStyle variant="body1">{review.upVotes}</TypographyStyle>
                                <IconButton title="like">
                                    <ThumbUpOutlined />
                                </IconButton>
                                <IconButton title="dislike">
                                    <ThumbDownOutlined />
                                </IconButton>
                                <TypographyStyle variant="body1">{review.downVotes}</TypographyStyle>
                            </StackStyle2>
                        </Stack>
                        <Stack>
                            <TypographyStyle1 variant="h6">Replies</TypographyStyle1>
                            {review.replies?.map((option, index) => (
                                <StackStyle4 elevation={6} key={index}>
                                    <StackStyle5 flexDirection="row" alignItems="center">
                                        <Typography variant="subtitle1" color="GrayText">
                                            {option.name}:
                                        </Typography>
                                        <Typography>{option.comment}</Typography>
                                    </StackStyle5>
                                </StackStyle4>
                            ))}
                        </Stack>
                    </StackStyle>
                </PaperStyle2>
            ))}
        </Stack>
    );
}

const TypographyStyle = styled(Typography)({
    backgroundColor: 'black',
    borderRadius: '50px',
    padding: '0px 10px',
    color: 'white',
});
const PaperStyle2 = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '20px',
    width: '700px',
    margin: '30px',
});

const TypographyStyle1 = styled(Typography)({
    fontWeight: 'bold',
});

const StackStyle = styled(Stack)({
    padding: '20px',
});

const StackStyle1 = styled(Stack)({
    gap: '10px',
});

const StackStyle2 = styled(Stack)({
    gap: '20px',
});

const StackStyle5 = styled(Stack)({
    gap: '10px',
});

const StackStyle4 = styled(Paper)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    padding: '10px',
});
