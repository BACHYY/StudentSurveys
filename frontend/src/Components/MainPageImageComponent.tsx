import { Stack, styled, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainPage from '../assets/MainPage.jpg';
import { setProfessor } from '../store/slices/professor-slice';
import Searchbar from './Searchbar';
import { useAppDispatch } from './useReactRedux';

export default function MainPageImageComponent() {
    const [type, setType] = useState<'professor' | 'school' | 'course'>('professor');
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const timer = useRef<any>();
    useEffect(() => {
        clearTimeout(timer.current);
        if (search === '') return;
        // hit api

        timer.current = setTimeout(() => {
            const fetchResults = async () => {
                const response = await fetch(`http://localhost:8000/api/prof/search?name=${search}&type=${type}`);
                const data = await response.json();
                setResults(data);
            };

            fetchResults();
        }, 100);
    }, [search]);

    return (
        <>
            <ImageStyle src={MainPage} alt="frontPageMainCover" />

            <StackStyle alignItems="center" justifyContent="center" spacing={5}>
                <Stack>
                    <TypographyStyle1 variant="h3" align="center">
                        Read reviews. Write reviews. Find Professors you can trust.
                    </TypographyStyle1>
                </Stack>

                <StackStyle2 alignItems="center" spacing={3}>
                    <Tabs
                        value={type}
                        onChange={(e, value) => setType(value)}
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <TabStyle color="error" value="school" label={'School'} />

                        <TabStyle value="professor" label={'Professor'} />
                        <TabStyle value="course" label={'Course'} />
                    </Tabs>
                    <Searchbar
                        setSearch={(name) => {
                            setSearch(name);
                        }}
                    />

                    <StackStyle1 alignItems="flex-start" spacing={2}>
                        {results.map((result: any) => {
                            return (
                                <div>
                                    {type === 'professor' ? (
                                        <TypographyStyle
                                            onClick={() => {
                                                navigate(`/${type}/${result.school}`);
                                                dispatch(setProfessor(result));
                                            }}
                                        >
                                            {result.name}
                                        </TypographyStyle>
                                    ) : type === 'school' ? (
                                        <TypographyStyle
                                            onClick={() => {
                                                navigate(`/${type}/${result.school}`);
                                                dispatch(setProfessor(result));
                                            }}
                                        >
                                            {result.school}
                                        </TypographyStyle>
                                    ) : (
                                        <TypographyStyle
                                            onClick={() => {
                                                navigate(`/${type}/${result.school}`);
                                                dispatch(setProfessor(result));
                                            }}
                                        >
                                            {result.course}
                                        </TypographyStyle>
                                    )}
                                </div>
                            );
                        })}
                    </StackStyle1>
                </StackStyle2>
            </StackStyle>
        </>
    );
}

const ImageStyle = styled('img')({
    height: '100%',
    postion: 'relative',
});

const StackStyle = styled(Stack)({
    position: 'absolute',
    color: 'white',
    top: '100px',
    left: '300px',
    width: '700px',
    minHeight: '550px',
});

const StackStyle1 = styled(Stack)({
    width: '400px',
    overflowY: 'auto',
});

const TypographyStyle1 = styled(Typography)({
    fontWeight: 'bold',
    color: 'white',
});

const TabStyle = styled(Tab)({
    color: 'white',
    fontWeight: 'bold',
});

const StackStyle2 = styled(Stack)({
    width: '500px',
    height: '350px',
});

const TypographyStyle = styled(Typography)({
    fontWeight: 'bold',
    cursor: 'pointer',
});
