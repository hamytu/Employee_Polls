import { connect } from 'react-redux';
import { handleLogin } from '../actions/authedUser';
import { useEffect } from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { InputLabel, Grid, Box, MenuItem, FormControl, Select } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

const Login = ({ dispatch, users, authedUser, loading }) => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const handleChange = (event) => {
        const username = event.target.value;
        dispatch(handleLogin(username)).then(() => {
            navigate(state?.path || '/');
        });
    };

    useEffect(() => {
        if (authedUser) {
            navigate('/');
        }
    }, [authedUser, navigate]);

    return (
        <>
            <LoadingBar scope='login' />
            <br />
            {!loading && (
                <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <Box height={200} width={600}>
                        <FormControl fullWidth disabled={loading}>
                            <InputLabel id='label-select-username'>SELECT USERNAME</InputLabel>
                            <Select
                                labelId='label-select-username'
                                id='username-select'
                                label='SELECT USERNAME'
                                defaultValue=""
                                onChange={handleChange}
                            >
                                {Object.keys(users).map((username) => (
                                    <MenuItem value={username} key={username}>
                                        {username}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            )}
        </>
    );
};

const mapStateToProps = ({ users, authedUser }) => ({
    users,
    authedUser,
    loading: !Object.keys(users).length, // More explicit check for loading
});

export default connect(mapStateToProps)(Login);
