import { Avatar, Button, Divider, Stack, styled, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import HeaderNavbar from '../Components/HeaderNavbar';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Components/useReactRedux';
import { setLogout } from '../store/slices/login-slice';
import UserUpdate from '../Components/UserUpdate';
import { CONFIG_API_URL } from '../constants/CONFIG';

export default function UserSettings() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const navigateToChangePass = () => {
        navigate('/usersettings/securityquestion');
    };

    const { data } = useAppSelector((state) => state.login);

    const _id = data._id;

    const onDelete = async () => {
        await fetch(`${CONFIG_API_URL}/api/users/${_id}`, { method: 'DELETE' });
        navigate('/');
        setTimeout(() => {
            dispatch(setLogout());
        }, 0);
    };

    return (
        <StackStyle>
            <HeaderNavbar />

            <StackStyle1 flexDirection="row" alignItems="center" justifyContent="space-between">
                <StackStyle2 flexDirection="row" alignItems="center">
                    <AvatarStyle alt={data.name} src="/broken-image.jpg" />{' '}
                    <Stack>
                        <Typography variant="h4">{data.name}</Typography>
                    </Stack>
                </StackStyle2>

                <StackStyle3 flexDirection="row">
                    <Button variant="contained" color="error" onClick={onDelete}>
                        Delete User
                    </Button>

                    <Button variant="contained" color="primary" onClick={navigateToChangePass}>
                        {' '}
                        change Password
                    </Button>
                </StackStyle3>
            </StackStyle1>
            <Divider />

            <UserUpdate />
        </StackStyle>
    );
}

const AvatarStyle = styled(Avatar)({
    bgcolor: deepPurple[500],
    width: '70px',
    height: '70px',
    fontSize: '30px',
});

const StackStyle1 = styled(Stack)({
    gap: '10px',
    height: '150px',
    padding: '0px 30px',
    backgroundColor: 'white',
});

const StackStyle2 = styled(Stack)({
    gap: '10px',
});

const StackStyle3 = styled(Stack)({
    gap: '15px',
});

const StackStyle = styled(Stack)({
    backgroundColor: '#FCFBF3',
    height: '100vh',
});
