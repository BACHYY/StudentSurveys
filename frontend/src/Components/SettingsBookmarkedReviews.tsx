import { Delete, ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';
import { Avatar, Divider, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useEffect } from 'react';
import { getUserBookmarks } from '../store/slices/post-bookmark-slice';
import ProfessorRating from './ProfessorRating';
import { useAppDispatch, useAppSelector } from './useReactRedux';
import { CONFIG_API_URL } from '../constants/CONFIG';

export default function SettingsBookmarkedReviews() {
    const { data } = useAppSelector((state) => state.login);

    const dispatch = useAppDispatch();
    const bookmarks = useAppSelector((state) => state.bookmark.data);
    useEffect(() => {
        dispatch(getUserBookmarks());
    }, []);

    const _id = data._id;
    const onDelete = async (bookmarkId: string) => {
        await fetch(`${CONFIG_API_URL}/api/bookmarks/reviews/${_id}/${bookmarkId}`, { method: 'DELETE' });
    };

    return (
        <Stack alignItems="center" justifyContent="center">
            {bookmarks.map((bookmark, index) => (
                <PaperStyle2 elevation={3} key={index}>
                    <StackStyle spacing={2}>
                        <StackStyle1 flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Stack flexDirection="row" alignItems="center" sx={{ gap: '10px' }}>
                                <Avatar sx={{ bgcolor: deepPurple[400] }} alt={data.name} src="/broken-image.jpg" />
                                <Typography>{bookmark.name}</Typography>
                            </Stack>
                            <Stack alignItems="flex-end">
                                <IconButton title="delete bookmark" onClick={() => onDelete(bookmark._id)}>
                                    <Delete color="error" />
                                </IconButton>
                                <Stack flexDirection="row" alignItems="center">
                                    <Typography sx={{ fontWeight: 'bold' }}>Professor: </Typography>

                                    <Typography variant="subtitle1" color="GrayText">
                                        {bookmark.profName}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </StackStyle1>
                        <Divider />
                        <Stack flexDirection="row" justifyContent="space-between">
                            <ProfessorRating value={3} />
                        </Stack>

                        <Stack>
                            <Typography>{bookmark.comment}</Typography>
                        </Stack>
                        <Divider />
                        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                            <StackStyle2 flexDirection="row" alignItems="center">
                                <TypographyStyle variant="body1">{bookmark.upVotes}</TypographyStyle>
                                <IconButton title="like">
                                    <ThumbUpOutlined />
                                </IconButton>
                                <IconButton title="dislike">
                                    <ThumbDownOutlined />
                                </IconButton>
                                <TypographyStyle variant="body1">{bookmark.downVotes}</TypographyStyle>
                            </StackStyle2>
                        </Stack>
                        <Stack>
                            <TypographyStyle1 variant="h6">Replies</TypographyStyle1>
                            {bookmark.replies?.map((option, index) => (
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

const StackStyle = styled(Stack)({
    padding: '20px',
});

const StackStyle1 = styled(Stack)({
    gap: '10px',
});

const StackStyle2 = styled(Stack)({
    gap: '20px',
});

const TypographyStyle1 = styled(Typography)({
    fontWeight: 'bold',
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
