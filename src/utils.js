export const resulListtarray = (data, searchArg, finderKey) => {
    if (searchArg?.length) {
        return (data || []).filter((x) =>
            (x?.[finderKey]).toLowerCase().includes(searchArg.toLowerCase())
        );
    } else {
        return data;
    }
};

export const hideScrollbar = {
    height: '93vh',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        width: 5,
        borderRadius: 10,
    },
    '&::-webkit-scrollbar-track': {
        background: '#161C24',
        borderRadius: 10,
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#355a8b',
        borderRadius: 10,
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
};
