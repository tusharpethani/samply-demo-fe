import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Backdrop,
    Box,
    Card,
    CircularProgress,
    Container,
    Grid,
    Pagination,
    Stack,
    Typography,
} from '@mui/material';
import Image from '../../components/Image';
import Topbar from '../Topbar';
import {
    selectDisneyCharacter,
    selectIsLoading,
} from '../../redux/general/generalSelector';
import { fetchDisneyCharacter } from '../../redux/general/generalThunk';
import { resulListtarray } from '../../utils';
import { hideScrollbar } from '../../utils';

const Home = () => {
    const [isSearch, setIsSearch] = useState('');
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const disneyCharacter = useSelector(selectDisneyCharacter);

    useEffect(() => {
        dispatch(fetchDisneyCharacter());
        // eslint-disable-next-line
    }, []);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const rowPerPage = 9;
    const countVal = Math.ceil(
        resulListtarray(disneyCharacter, isSearch, 'name')?.length / rowPerPage
    );
    const begin = (page - 1) * rowPerPage;
    const end = begin + rowPerPage;

    return (
        <>
            <Topbar isSearch={isSearch} setIsSearch={setIsSearch} />
            <Box sx={{ ...hideScrollbar }}>
                <Container sx={{ py: 5 }}>
                    <Backdrop
                        open={isLoading}
                        sx={{ zIndex: 1000, color: '#fff' }}
                    >
                        <CircularProgress color="info" />
                    </Backdrop>
                    <Grid container spacing={3}>
                        {resulListtarray(disneyCharacter, isSearch, 'name')
                            .slice(begin, end)
                            .map((obj, index) => {
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={index}
                                    >
                                        <Card sx={{ height: '100%' }}>
                                            <Box sx={{ position: 'relative' }}>
                                                <Image
                                                    alt={'dummy'}
                                                    src={obj?.imageUrl}
                                                    ratio="21/9"
                                                />
                                            </Box>
                                            <Stack spacing={2} sx={{ p: 3 }}>
                                                <Typography variant="h6" noWrap>
                                                    {obj?.name}
                                                </Typography>
                                            </Stack>
                                        </Card>
                                    </Grid>
                                );
                            })}
                    </Grid>
                    {disneyCharacter.length && (
                        <Box sx={{ my: 2 }}>
                            <Grid container justifyContent={'center'}>
                                <Grid item>
                                    <Pagination
                                        count={countVal}
                                        variant="outlined"
                                        shape="rounded"
                                        onChange={handleChangePage}
                                        page={page}
                                        data-test-id="paginationTestId"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default Home;
