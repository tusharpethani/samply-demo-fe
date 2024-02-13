import { createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';
import {
    acquireToken,
    addTodo,
    fetchDisneyCharacter,
    fetchTodoList,
} from './generalThunk';

const initialState = {
    isLoading: false,
    authToken: null,
    user: {},
    disneyCharacter: [],
    todoList: [],
};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        logOut: (state) => {
            state.isLoading = false;
            state.authToken = null;
            state.user = {};
        },
        setJwtToken: (state, action) => {
            state.authToken = action.payload;
        },
        setLoggedInUserInfo: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(acquireToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(acquireToken.fulfilled, (state, { payload }) => {
                console.log('payload', payload);
                state.authToken = get(payload, 'token', null);
                state.user = payload;
                state.isLoading = false;
            })
            .addCase(acquireToken.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
            // Fetch data from third-party API
            .addCase(fetchDisneyCharacter.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDisneyCharacter.fulfilled, (state, { payload }) => {
                state.disneyCharacter = payload;
                state.isLoading = false;
            })
            .addCase(fetchDisneyCharacter.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
            // Fetch todo list
            .addCase(fetchTodoList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTodoList.fulfilled, (state, { payload }) => {
                state.todoList = payload;
                state.isLoading = false;
            })
            .addCase(fetchTodoList.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
            // Add todo: Haven't remove payload for future use case in all the scenarios defines above and below
            .addCase(addTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTodo.fulfilled, (state, { payload }) => {
                state.isLoading = false;
            })
            .addCase(addTodo.rejected, (state, { payload }) => {
                state.isLoading = false;
            });
    },
});

/**
 * Actions
 */
export const { logOut, setLoggedInUserInfo, setJwtToken, setLoading } =
    generalSlice.actions;

/**
 * Reducers
 */
export const generalReducer = generalSlice.reducer;
