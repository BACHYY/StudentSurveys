import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Stack,
    styled,
} from '@mui/material';

import { useEffect, useState } from 'react';
import Popup from './Popup';
import { Toaster, toast } from 'react-hot-toast';
import { CONFIG_API_URL } from '../constants/CONFIG';
import { useAppDispatch, useAppSelector } from './useReactRedux';
import { useDispatch } from 'react-redux';

interface ITableReview {
    _id: string;
    comment: string;
    ratingValue: number;
    upVotes: number;
    downVotes: number;
    profName: string;
    user: string;
}

interface ISingleRow {
    row: ITableReview;
    deleteReviewFromUI: (_id: string) => void;
}

function SingleRow({ row, deleteReviewFromUI }: ISingleRow) {
    const [restoreModalOpen, setRestoreModalOpen] = useState(false);
    const data = useAppSelector((state) => state.login.data);
    const [restoring, setRestoring] = useState(false);
    const handleSubmit = () => {
        if (!restoring) {
            setRestoring(true);

            fetch(`${CONFIG_API_URL}/api/reviews/restore/${row._id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${data.token}` },
            })
                .then(async (response) => {
                    await response.json();
                    setRestoring(false);
                    deleteReviewFromUI(row._id);
                    toast.success('Review restored successfully');
                    handleModalClose();
                })
                .catch((err) => {
                    toast.error(err.response?.data.message || 'Error restoring review');
                    handleModalClose();
                });
        }
    };

    const handleModalClose = () => {
        setRestoreModalOpen(false);
    };

    const handleModalOpen = () => {
        setRestoreModalOpen(true);
    };
    return (
        <>
            <Popup isOpen={restoreModalOpen} closePopupHandler={handleModalClose}>
                <div className="reviewDeletion">
                    <div>Are you sure you want to restore this review?</div>
                    <StackStyle1 flexDirection={'row'} marginTop={'1rem'} alignItems="center" justifyContent={'center'}>
                        <Stack>
                            <Button onClick={handleSubmit} variant="contained" color="info">
                                {restoring ? 'Restoring...' : 'Confirm'}
                            </Button>
                        </Stack>
                        <Stack>
                            <Button onClick={handleModalClose} variant="contained" color="error">
                                Cancel
                            </Button>
                        </Stack>
                    </StackStyle1>
                </div>
            </Popup>
            <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                    {row._id}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                    {row.comment}
                </TableCell>
                <TableCell align="right">{row.ratingValue}</TableCell>
                <TableCell align="right">{row.user}</TableCell>
                <TableCell align="right">
                    <Button
                        onClick={handleModalOpen}
                        variant="contained"
                        style={{ backgroundColor: 'green', color: 'white', borderRadius: '10px' }}
                    >
                        Restore
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
}

function ReviewTable({
    data,
    deleteReviewFromUI,
}: {
    data: ITableReview[];
    deleteReviewFromUI: (_id: string) => void;
}) {
    return (
        <TableContainer
            component={Paper}
            style={{
                maxWidth: '90vw',
            }}
        >
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Review ID</TableCell>
                        <TableCell align="center">Comment</TableCell>
                        <TableCell align="center">Rating</TableCell>
                        <TableCell align="center">User</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <SingleRow deleteReviewFromUI={deleteReviewFromUI} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function DeletedReviews() {
    const TestData: ITableReview[] = [];

    const [loading, setLoading] = useState<boolean>(false);
    const [reviews, setReviews] = useState<ITableReview[]>(TestData);

    const data = useAppSelector((state) => state.login.data);
    const removeReviewFromUI = (_id: string) => {
        const newReviews = reviews.filter((review) => review._id !== _id);
        setReviews(newReviews);
    };

    useEffect(() => {
        fetch(`${CONFIG_API_URL}/api/reviews/deleted`, {
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        })
            .then(async (res) => {
                const data = await res.json();
                console.log(data.reviews);
                setReviews(data.reviews);
            })
            .catch((err) => {
                toast.error(err.response?.data.message || 'Error fetching data');
            });
    }, []);
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Toaster />
            <Typography variant="h5" margin={'3rem'}>
                Deleted Reviews
            </Typography>
            {loading ? (
                <Typography variant="h5">Loading...</Typography>
            ) : (
                <ReviewTable deleteReviewFromUI={removeReviewFromUI} data={reviews} />
            )}
        </div>
    );
}

export default DeletedReviews;

const StackStyle1 = styled(Stack)({
    gap: '10px',
});
