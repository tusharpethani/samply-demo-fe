import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputLabel,
    TextField,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import React from 'react';
import * as Yup from 'yup';
import { acquireToken } from '../../redux/general/generalThunk';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = (props) => {
    const { open, onClose } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRedirection = (res) => {
        if (get(res, 'status', '') === 1) {
            navigate('/todo');
        }
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log('values', values);
            onClose(false);
            resetForm();
            dispatch(acquireToken({ loginData: values, handleRedirection }));
        },
    });

    const hasError = (fieldName) =>
        formik.touched[fieldName] && Boolean(formik.errors[fieldName]);

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="sm"
            onClose={() => onClose(false)}
        >
            <Box component={'form'} onSubmit={formik.handleSubmit}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputLabel>
                                <Typography color={'ButtonFace'}>
                                    Email
                                </Typography>
                            </InputLabel>
                            <TextField
                                variant="outlined"
                                color="info"
                                fullWidth
                                name="email"
                                placeholder="please enter email"
                                error={hasError('email')}
                                helperText={
                                    hasError('email')
                                        ? formik.errors.email
                                        : null
                                }
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email || ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel>
                                <Typography color={'ButtonFace'}>
                                    Password
                                </Typography>
                            </InputLabel>
                            <TextField
                                variant="outlined"
                                color="info"
                                fullWidth
                                name="password"
                                error={hasError('password')}
                                helperText={
                                    hasError('password')
                                        ? formik.errors.password
                                        : null
                                }
                                type="password"
                                placeholder="please enter password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password || ''}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent={'center'} spacing={3}>
                        <Grid item>
                            <Button
                                type="submit"
                                variant="contained"
                                color="info"
                            >
                                Submit
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                type="button"
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    onClose(false);
                                    formik.resetForm();
                                }}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default Login;
