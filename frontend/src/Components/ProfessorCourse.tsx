import { Button, Typography, styled, Stack, TextField, IconButton } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { Book } from '@mui/icons-material';
import { useAppSelector } from './useReactRedux';
import Popup from './Popup';

import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CONFIG_API_URL } from '../constants/CONFIG';

interface TCourse {
    _id?: string;
    courseName: string;
    courseCount: number;
}

interface IAddCourse {
    setCourseToDom: (course: TCourse) => void;
    token: string;
    professorId: string | undefined;
}
function AddCourse({ token, professorId, setCourseToDom }: IAddCourse) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [adding, setAdding] = useState<boolean>(false);

    const [course, setCourse] = useState<null | string>(null);

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleSubmit = () => {
        if (!course || !course?.length) {
            toast.error('Please enter course');
            return;
        }
        if (!adding) {
            setAdding(true);
            fetch(`${CONFIG_API_URL}/api/prof/addCourse/${professorId}`, {
                method: 'POST',
                body: JSON.stringify({
                    courseName: course,
                    courseCount: 1,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setAdding(false);
                    handleModalClose();
                    toast.success('Course added successfully');
                })
                .catch((err) => {
                    setAdding(false);
                    handleModalClose();
                    toast.error(err.response?.data.message || 'Error while adding course');
                });
        }
    };

    const handleChange = (e: ChangeEvent) => {
        setCourse((e.target as HTMLInputElement).value);
    };

    return (
        <>
            <Button onClick={handleModalOpen} variant="contained" style={{ height: '3.3rem', marginLeft: '1rem' }}>
                {' '}
                <IconButton>
                    <Book style={{ color: 'white' }} />
                </IconButton>
                Add Course
            </Button>
            <Popup isOpen={modalOpen} closePopupHandler={handleModalClose}>
                <StackStyle
                    justifyContent={'center'}
                    padding={'1rem'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    minWidth={'40rem'}
                >
                    <TextField
                        id="outlined-basic"
                        label="Course Name"
                        variant="outlined"
                        onChange={handleChange}
                        style={{ minWidth: '70%' }}
                        value={course}
                    />
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        style={{ height: '3.3rem', marginLeft: '1rem', marginTop: '1rem' }}
                    >
                        {' '}
                        {adding ? 'Adding' : 'submit'}
                    </Button>
                </StackStyle>
            </Popup>
        </>
    );
}

function ListCourses({ courses }: { courses: TCourse[] }) {
    const navigate = useNavigate();

    return (
        <StackStyle flexDirection={'column'}>
            {courses.map((course) => {
                return (
                    <div
                        style={{ cursor: 'pointer', zIndex: 100 }}
                        onClick={() => {
                            navigate(`/course/${course._id}`);
                        }}
                    >
                        <StackStyle
                            flexDirection={'row'}
                            alignContent={'center'}
                            justifyContent={'center'}
                            marginTop={'-5rem'}
                        >
                            <Book />
                            <Typography variant="h5">{course.courseName}</Typography>
                        </StackStyle>
                    </div>
                );
            })}
        </StackStyle>
    );
}

function ProfessorCourse() {
    const { _id } = useAppSelector((state) => state.professor.data);
    const { token } = useAppSelector((state) => state.login.data);

    const [courses, setCourses] = useState<TCourse[]>([]);

    const setCourseToDom = (course: TCourse): void => {
        setCourses(courses.concat(course));
    };

    const handleChange = async (e: ChangeEvent): Promise<void> => {
        const fieldValue = (e.target as HTMLInputElement).value;
        if (!fieldValue || !fieldValue.length) {
            setCourses([]);
        }
        try {
            const { data } = await axios.get(
                `${CONFIG_API_URL}/api/prof/searchCourse/?profId=${_id}&search=${fieldValue}`
            );
            setCourses(data.courses as TCourse[]);
        } catch (err) {
            toast.error('Error while searching course');
        }
    };

    return (
        <>
            <StackStyle flexDirection={'column'}>
                <Toaster />
                <StackStyle justifyContent={'center'} flexDirection={'row'} minWidth={'40rem'}>
                    <TextField
                        id="outlined-basic"
                        label="Search course"
                        variant="outlined"
                        onChange={handleChange}
                        style={{ minWidth: '50%' }}
                    />
                    <AddCourse token={token} setCourseToDom={setCourseToDom} professorId={_id} />
                </StackStyle>
                <Stack>{courses.length ? <ListCourses courses={courses} /> : <></>}</Stack>
            </StackStyle>
        </>
    );
}

export default ProfessorCourse;

const StackStyle = styled(Stack)({
    minHeight: '150px',
    backgroundColor: 'white',
});
