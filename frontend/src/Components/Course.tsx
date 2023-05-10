import React, { useEffect, useState } from 'react';
import HeaderNavbar from './HeaderNavbar';
import { Fade, IconButton, Stack, Typography, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ICourse, IProf, setProfessor } from '../store/slices/professor-slice';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../store/slices/snackbar-slice';
import { Person } from '@mui/icons-material';
import { CONFIG_API_URL } from '../constants/CONFIG';
import { useAppSelector } from './useReactRedux';

export interface ICourseProfessorData {
    course?: ICourse;
    professors: IProf[];
}

function ListProfessors({ professors }: { professors: IProf[] }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <StackStyle
            flexDirection={'row'}
            flexWrap={'wrap'}
            maxWidth={'1000px'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            {professors.map((professor) => {
                return (
                    <>
                        <StackStyle
                            border={'1px solid blue'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'space-around'}
                            marginLeft={'1rem'}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                dispatch(setProfessor(professor));
                                navigate(`/professor/${professor.school}/?profid=${professor._id}`);
                            }}
                        >
                            <IconButton>
                                <Person style={{ color: 'blue' }} />
                            </IconButton>
                            <StackStyle flexDirection={'column'} alignItems="center" justifyContent="center">
                                <Typography variant="h4">{professor.name}</Typography>
                                {professor.department && (
                                    <Typography variant="caption">Department: {professor.department}</Typography>
                                )}
                            </StackStyle>
                        </StackStyle>
                    </>
                );
            })}
        </StackStyle>
    );
}
function Course() {
    const [loading, setLoading] = useState(true);
    const { course_id } = useParams();

    const [data, setData] = useState<ICourseProfessorData>({
        professors: [],
    });

    console.log(course_id);

    const dispatch = useDispatch();

    useEffect(() => {
        if (course_id) {
            fetch(`${CONFIG_API_URL}/api/course/professors/${course_id}`)
                .then(async (response) => {
                    const data = await response.json();
                    setData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    dispatch(setSnackbar('Error loading data', { severity: 'error' }));
                    setLoading(false);
                });
        }
    }, [course_id]);
    return (
        <>
            <HeaderNavbar />
            <Fade in={loading} timeout={300}>
                <p>loading...</p>
            </Fade>
            <StackStyle flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                {data.course && (
                    <Stack>
                        <Typography variant="h4">Course: {data.course.courseName}</Typography>
                    </Stack>
                )}
                <Typography
                    variant="h6"
                    style={{ marginTop: '1rem', marginBottom: data.professors.length ? '-2rem' : '0rem' }}
                >
                    Professors teaching the course
                </Typography>
                {data.professors?.length ? (
                    <ListProfessors professors={data.professors} />
                ) : (
                    <>
                        <Typography variant="caption">No professor teach this course.</Typography>
                    </>
                )}
            </StackStyle>
        </>
    );
}

const StackStyle = styled(Stack)({
    padding: '40px',
    display: 'flex',
});

export default Course;
