import { Stack, styled, Typography } from '@mui/material';
import ProfessorRating from './ProfessorRating';
import { useAppSelector } from './useReactRedux';

export default function ProfessorReviewHeader() {
    const { data } = useAppSelector((state) => state.professor);
    const { rating } = useAppSelector((state) => state.review.data);

    return (
        <StackStyle alignItems="flex-start" justifyContent="center">
            <StackStyle1 justifyContent="flex-start" alignItems="center" flexDirection="row">
                <ImageStyle
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsjsq5P9lqOxc-k4efzNXBbx7v4pB4ydrWb7VFfEk&s"
                    alt="img"
                />

                <Stack>
                    <Typography variant="h3">{data.name}</Typography>
                    <Typography variant="h6" color="GrayText">
                        Reviews
                    </Typography>
                    <ProfessorRating value={rating.averageRating} />
                </Stack>
            </StackStyle1>
        </StackStyle>
    );
}

const StackStyle = styled(Stack)({
    height: '250px',
    backgroundColor: 'white',
});

const StackStyle1 = styled(Stack)({
    width: '400px',
    height: '200px',
    gap: '35px',
    marginLeft: '80px',
});

const ImageStyle = styled('img')({
    height: '130px',
    width: '130px',
    borderRadius: '50%',
});
