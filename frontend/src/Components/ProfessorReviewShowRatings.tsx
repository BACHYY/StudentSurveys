import { StarRate } from '@mui/icons-material';
import { Checkbox, Paper, Slider, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import { Irating } from '../store/slices/post-review-slice';
import { IReviewLevel, TLevelName } from './Review';

export interface RatingProps {
    ratingData: Irating;
    handleShowLevel: (name: TLevelName) => void;
    showLevels: IReviewLevel;
}

export default function ProfessorReviewShowRatings({ ratingData, handleShowLevel, showLevels }: RatingProps) {
    const { averageRating, total, options } = ratingData;
    return (
        <PaperStyle1 variant="outlined" square>
            <StackStyle>
                <StackStyle1 alignItems="center" flexDirection="row">
                    <TypographyStyle variant="h4">Reviews</TypographyStyle>
                    <StarRateStyle fontSize="large" />
                    <Typography variant="h6">{averageRating}</Typography>
                </StackStyle1>
                <Typography>{total} Total</Typography>
            </StackStyle>

            <PaperStyle2 variant="outlined" square>
                {options.map((option) => (
                    <StackStyle2 flexDirection="row" alignItems="center" justifyContent="space-between">
                        <StackStyle3 flexDirection="row" alignItems="center">
                            <Checkbox
                                checked={showLevels[option.title]}
                                onChange={() => {
                                    handleShowLevel(option.title);
                                }}
                            />
                            <Typography>{option.title}</Typography>
                        </StackStyle3>
                        <StackStyle4>
                            <Slider disabled value={option.rating_percentage} aria-label="Disabled slider" />
                        </StackStyle4>
                        <Typography>{option.rating_percentage}%</Typography>
                    </StackStyle2>
                ))}
            </PaperStyle2>
        </PaperStyle1>
    );
}

const TypographyStyle = styled(Typography)({
    fontWeight: 'bold',
});

const StarRateStyle = styled(StarRate)({
    color: '#f2b707',
});
const PaperStyle1 = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
    margin: '30px',
});

const PaperStyle2 = styled(Paper)({
    margin: '0px 20px',
});

const StackStyle = styled(Stack)({
    margin: '20px',
});

const StackStyle1 = styled(Stack)({
    gap: '5px',
});

const StackStyle2 = styled(Stack)({
    gap: '20px',
    margin: '0px 20px',
});

const StackStyle3 = styled(Stack)({
    gap: '10px',
});

const StackStyle4 = styled(Stack)({
    width: '800px',
});
