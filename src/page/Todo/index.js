import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Backdrop,
    Box,
    Card,
    CircularProgress,
    Container,
    Grid,
    Button,
    Stack,
    Typography,
    InputLabel,
    TextField,
} from '@mui/material';
import Topbar from '../Topbar';
import {
    selectIsLoading,
    selectTodoList,
} from '../../redux/general/generalSelector';
import { addTodo, fetchTodoList } from '../../redux/general/generalThunk';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { hideScrollbar, resulListtarray } from '../../utils';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
});

function Todo() {
    const dispatch = useDispatch();
    const todoList = useSelector(selectTodoList);
    const isLoading = useSelector(selectIsLoading);
    const [isSearch, setIsSearch] = useState('');

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log('values', values);
            resetForm();
            dispatch(addTodo(values));
        },
    });

    useEffect(() => {
        dispatch(fetchTodoList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hasError = (fieldName) =>
        formik.touched[fieldName] && Boolean(formik.errors[fieldName]);

    return (
        <>
            <Topbar isSearch={isSearch} setIsSearch={setIsSearch} />
            <Box
                sx={{ ...hideScrollbar }}
                component={'form'}
                onSubmit={formik.handleSubmit}
            >
                <Container sx={{ py: 5 }}>
                    <Backdrop
                        open={isLoading}
                        sx={{ zIndex: 1000, color: '#fff' }}
                    >
                        <CircularProgress color="info" />
                    </Backdrop>
                    <Grid
                        container
                        display={'flex'}
                        justifyContent={'center'}
                        flexDirection={'column'}
                        spacing={2}
                    >
                        <Grid item xs={12} md={6}>
                            <InputLabel>
                                <Typography color={'ButtonFace'}>
                                    Title
                                </Typography>
                            </InputLabel>
                            <TextField
                                variant="outlined"
                                color="info"
                                fullWidth
                                name="title"
                                placeholder="please enter title"
                                error={hasError('title')}
                                helperText={
                                    hasError('title')
                                        ? formik.errors.title
                                        : null
                                }
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title || ''}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InputLabel>
                                <Typography color={'ButtonFace'}>
                                    Description
                                </Typography>
                            </InputLabel>
                            <TextField
                                variant="outlined"
                                color="info"
                                fullWidth
                                name="description"
                                error={hasError('description')}
                                helperText={
                                    hasError('description')
                                        ? formik.errors.description
                                        : null
                                }
                                multiline
                                rows={3}
                                type="description"
                                placeholder="please enter description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description || ''}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                variant="contained"
                                color="info"
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} paddingTop={3}>
                        {todoList.length > 0 ? (
                            <>
                                {(
                                    resulListtarray(
                                        todoList,
                                        isSearch,
                                        'title'
                                    ) || []
                                ).map((ele, ind) => {
                                    return (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            key={ind}
                                        >
                                            <Card sx={{ height: '100%' }}>
                                                <Stack
                                                    spacing={2}
                                                    sx={{ p: 3 }}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        noWrap
                                                    >
                                                        {ele?.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="h6"
                                                        noWrap
                                                    >
                                                        {ele?.description}
                                                    </Typography>
                                                </Stack>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </>
                        ) : null}
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default Todo;
