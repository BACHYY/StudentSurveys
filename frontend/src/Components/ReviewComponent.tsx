import { BookmarkBorderOutlined, DeleteOutline, ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';
import { Avatar, Button, Divider, IconButton, Paper, Stack, styled, TextField, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { MouseEvent, useState } from 'react';
import { postBookmark } from '../store/slices/post-bookmark-slice';
import { postReply } from '../store/slices/post-reply-slice';
import { IReview, postVote, deleteReview, IDelete } from '../store/slices/post-review-slice';
import ProfessorRating from './ProfessorRating';
import { useAppDispatch, useAppSelector } from './useReactRedux';
import Popup from './Popup';
import { CONFIG_API_URL } from '../constants/CONFIG';
import axios from 'axios';
import { TPayloadType, setSnackbar } from '../store/slices/snackbar-slice';
import { connect } from 'react-redux';

interface Review {
    review: IReview;
    setSnackbar: (message: string, props: TPayloadType | undefined) => void;
    deleteReview: (props: IDelete) => void;
}



function ReviewComponent({ review, setSnackbar, deleteReview }: Review) {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.professor);
    const profName = data.name;
    const login = useAppSelector((state) => state.login.data);
    const name = login.name;

    const [showReviewPopup, setShowReviewPopup] = useState<boolean>(false);

    const [deleting, setDeleting] = useState<boolean>(false);

    const [comment, setComment] = useState('');

    // const [showDeletePopup, setShowDeletePopup] = useState<boolean | null>(false);

    const onSubmit = async (reviewId: string) => {
        dispatch(postReply({ comment, reviewId, name }));
    };

    const Bookmark = (reviewId: string) => {
        dispatch(postBookmark({ reviewId, profName }));
    };

    const upVote = async (reviewId: string) => {
        dispatch(postVote({ reviewId, voteType: 'up' }));
    };

    const downVote = async (reviewId: string) => {
        dispatch(postVote({ reviewId, voteType: 'down' }));
    };

    const showReviewHandler = (): void => {
        setShowReviewPopup(true);
    };

    const closeReviewHandler = (): void => {
        setShowReviewPopup(false);
    };
    const deleteCurrentReview = async () => {
        if (login.isAdmin) {
            setDeleting(true);

            deleteReview({ profId: data._id, reviewId: review._id });
            setDeleting(false);

            // axios
            //     .delete(`${CONFIG_API_URL}/api/reviews/${data._id}/${review._id}`, {
            //         headers: {
            //             Authorization: `Bearer ${login.token}`,
            //         },
            //     })
            //     .then((response) => {
            //         setShowReviewPopup(false);
            //         setDeleting(false);
            //         setSnackbar('Deleted successfully', { severity: 'success' });
            //     })
            //     .catch((err) => {
            //         setShowReviewPopup(false);
            //         setDeleting(false);
            //         setSnackbar(err.response?.data.message || 'Error deleting review', { severity: 'error' });
            //     });
        } else {
            closeReviewHandler();
        }
    };

    return (
        <div>
            {showReviewPopup && (
                <Popup isOpen={showReviewPopup} closePopupHandler={closeReviewHandler}>
                    <div className="reviewDeletion">
                        <div>Are you sure you want to delete this review?</div>
                        <StackStyle1
                            flexDirection={'row'}
                            marginTop={'1rem'}
                            alignItems="center"
                            justifyContent={'center'}
                        >
                            <Stack>
                                <Button onClick={deleteCurrentReview} variant="contained" color="success">
                                    {deleting ? 'Deleting...' : 'Confirm'}
                                </Button>
                            </Stack>
                            <Stack>
                                <Button onClick={closeReviewHandler} variant="contained" color="error">
                                    Cancel
                                </Button>
                            </Stack>
                        </StackStyle1>
                    </div>
                </Popup>
            )}
            <PaperStyle2 elevation={3}>
                <StackStyle spacing={2}>
                    <StackStyle1 flexDirection="row" justifyContent="space-between">
                        <StackStyle1 flexDirection="row">
                            <Avatar alt={review.name} src="/broken-image.jpg" sx={{ bgcolor: deepPurple[500] }} />

                            <Stack>
                                <Typography>{review.name}</Typography>
                                <Typography color="GrayText">1 Review</Typography>
                            </Stack>
                        </StackStyle1>
                        {login.isAdmin && (
                            <Stack>
                                <IconButton onClick={showReviewHandler}>
                                    <DeleteOutline />
                                </IconButton>
                            </Stack>
                        )}
                    </StackStyle1>

                    <Divider />
                    <Stack flexDirection="row" justifyContent="space-between">
                        <ProfessorRating value={review.ratingValue} />
                    </Stack>

                    <Stack>
                        <Typography>{review.comment}</Typography>
                    </Stack>
                    <Divider />
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                        <StackStyle2 flexDirection="row" alignItems="center">
                            <TypographyStyle variant="body1">{review.upVotes}</TypographyStyle>
                            <IconButton title="like" onClick={() => upVote(review._id)}>
                                <ThumbUpOutlined />
                            </IconButton>
                            <IconButton title="dislike" onClick={() => downVote(review._id)}>
                                <ThumbDownOutlined />
                            </IconButton>
                            <TypographyStyle variant="body1">{review.downVotes}</TypographyStyle>
                        </StackStyle2>
                        <IconButtonStyle title="bookmark" onClick={() => Bookmark(review._id)}>
                            <BookmarkBorderOutlined />
                        </IconButtonStyle>
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
                    <TextField
                        label="Reply Here"
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </StackStyle>

                <StackStyle3 alignItems="center">
                    <Button variant="contained" size="small" onClick={() => onSubmit(review._id)}>
                        Reply
                    </Button>
                </StackStyle3>
            </PaperStyle2>
        </div>
    );
}

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

const IconButtonStyle = styled(IconButton)({
    backgroundColor: 'gray',
    color: 'white',
});

const TypographyStyle1 = styled(Typography)({
    fontWeight: 'bold',
});

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

const StackStyle = styled(Stack)({
    padding: '20px',
});

const StackStyle1 = styled(Stack)({
    gap: '10px',
});

const StackStyle2 = styled(Stack)({
    gap: '20px',
});

const StackStyle3 = styled(Stack)({
    padding: '10px',
});

export default connect(null, { setSnackbar, deleteReview })(ReviewComponent);
