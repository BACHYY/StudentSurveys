import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import RestoreFromTrashOutlined from '@mui/icons-material/RestoreFromTrashOutlined';
import Logout from '@mui/icons-material/Logout';
import Bookmarks from '@mui/icons-material/Bookmarks';
import Reviews from '@mui/icons-material/Reviews';
import School from '@mui/icons-material/School';
import PersonPin from '@mui/icons-material/PersonPin';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './useReactRedux';
import { deepOrange } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { setLogout } from '../store/slices/login-slice';

export default function NavbarMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navigateToAddSchools = () => {
        navigate('/admin/addSchools');
    };

    const navigateToAddProfessor = () => {
        navigate('/admin/addProfessors');
    };

    const navigateToSettings = () => {
        navigate('/usersettings');
    };

    const navigateToBookmarks = () => {
        navigate('/userSettings/bookmarkedReviews');
    };

    const navigateToReviews = () => {
        navigate('/userSettings/reviews');
    };

    const navigateToDeletedReviews = () => {
        navigate('/dashboard/deletedReviews');
    };

    const navigateToInitialState = () => {
        navigate('/');
        setTimeout(() => {
            dispatch(setLogout());
        }, 0);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { data } = useAppSelector((state) => state.login);

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ bgcolor: deepOrange[400] }} alt={data.name} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {!data.isAdmin ? (
                    <>
                        <MenuItem onClick={navigateToBookmarks}>
                            <Bookmarks fontSize="small" sx={{ paddingRight: '10px', color: 'gray' }} /> Bookmarks
                        </MenuItem>
                        <MenuItem onClick={navigateToReviews}>
                            <Reviews fontSize="small" sx={{ paddingRight: '10px', color: 'gray' }} /> My Reviews
                        </MenuItem>

                        <MenuItem onClick={navigateToAddSchools}>
                            <School fontSize="small" sx={{ paddingRight: '10px', color: 'gray' }} />
                            Add School
                        </MenuItem>

                        <MenuItem onClick={navigateToAddProfessor}>
                            <PersonPin fontSize="small" sx={{ paddingRight: '10px', color: 'gray' }} /> Add Professor
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem onClick={navigateToDeletedReviews}>
                        <RestoreFromTrashOutlined fontSize="small" sx={{ paddingRight: '10px', color: 'gray' }} />{' '}
                        Deleted Reviews
                    </MenuItem>
                )}

                <Divider />
                {!data.isAdmin && (
                    <MenuItem onClick={navigateToSettings}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                )}

                <MenuItem onClick={navigateToInitialState}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
