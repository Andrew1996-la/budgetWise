import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setErrorMessage } from '../utils';
import { BASE_URL, COMMAND_ID } from './const';

interface IInitialState {
    token: undefined | string;
    error: undefined | string;
}

const initialState: IInitialState = {
    token: localStorage.getItem('token') || undefined,
    error: undefined,
};

export const setTokenThunk = createAsyncThunk(
    'authorization/setTokenThunk',
    async function (requestData: Record<string, string>) {
        const body = {
            email: requestData.email,
            password: requestData.password,
            commandId: COMMAND_ID,
        };

        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
);

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        removeToken: (state: IInitialState) => {
            state.token = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            setTokenThunk.fulfilled,
            (state: IInitialState, action) => {
                if (action.payload.errors) {
                    const error = action.payload.errors[0];
                    state.error = setErrorMessage(error.name);
                } else {
                    state.token = action.payload.token;
                    state.error = undefined;
                    localStorage.setItem('token', action.payload.token);
                }
            }
        );
        builder.addCase(
            setTokenThunk.rejected,
            (state: IInitialState, action) => {
                state.error = action.error.name;
            }
        );
    },
});

export const { removeToken } = authorizationSlice.actions;

export default authorizationSlice.reducer;
