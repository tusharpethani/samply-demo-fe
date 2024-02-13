import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';
import axios from 'axios';

export const acquireToken = createAsyncThunk(
    'general/acquireToken',
    async (data, { rejectWithValue }) => {
        const { loginData, handleRedirection } = data;

        try {
            const response = await axios.post(
                `http://localhost:8080/api/users/login`,
                { ...loginData }
            );

            if (get(response, 'status') === 200) {
                handleRedirection(response.data);
                sessionStorage.setItem(
                    'authToken',
                    JSON.stringify(get(response, 'data.data.token', undefined))
                );
                return response?.data?.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            handleRedirection(error);
            return rejectWithValue(error);
        }
    }
);

export const fetchDisneyCharacter = createAsyncThunk(
    'general/fetchDisneyCharacter',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://api.disneyapi.dev/character`
            );

            if (get(response, 'status') === 200) {
                return response?.data?.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchTodoList = createAsyncThunk(
    'general/fetchTodoList',
    async (_, { rejectWithValue, getState }) => {
        const state = getState();
        try {
            const response = await axios.get(
                `http://localhost:8080/api/todo/get-all`,
                { headers: { Authorization: state?.general?.authToken } }
            );

            if (get(response, 'status') === 200) {
                return response?.data?.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addTodo = createAsyncThunk(
    'general/addTodo',
    async (data, { rejectWithValue, getState, dispatch }) => {
        const state = getState();
        try {
            const response = await axios.post(
                `http://localhost:8080/api/todo/add`,
                { ...data },
                { headers: { Authorization: state?.general?.authToken } }
            );

            if (get(response, 'status') === 200) {
                dispatch(fetchTodoList());
            } else {
                return rejectWithValue(response);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
