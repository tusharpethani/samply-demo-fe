import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Button,
    Container,
    Grid,
    InputBase,
    Toolbar,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import LoginForm from './Login/index.js';
import { selectToken } from '../redux/general/generalSelector.js';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '30px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
        [theme.breakpoints.down('sm')]: {
            width: '12ch',
        },
    },
}));

const Topbar = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const authToken = useSelector(selectToken);
    const { isSearch, setIsSearch } = props;
    const [open, setOpen] = useState(false);
    const searchValue = (event) => {
        setIsSearch(event.target.value);
    };
    const handleLogin = () => {
        authToken !== null ? navigate('/todo') : setOpen(true);
    };
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Container>
                        <Grid
                            container
                            alignItems={'center'}
                            justifyContent={'space-between'}
                        >
                            <Grid item>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        value={isSearch}
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={searchValue}
                                    />
                                </Search>
                            </Grid>
                            <Grid item>
                                {location?.pathname === '/todo' ? (
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() => navigate('/')}
                                    >
                                        Home
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() => handleLogin()}
                                    >
                                        Login
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
            <LoginForm open={open} onClose={setOpen} />
        </>
    );
};

export default Topbar;
