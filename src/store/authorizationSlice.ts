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

export const signUp = createAsyncThunk(
    'authorization/signUp',
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

export const signIn = createAsyncThunk(
    'authorization/signIn',
    async function(requestData: Record<string, string>) {
        const body = {
            email: requestData.email,
            password: requestData.password,
        }

        try {
            const response = await fetch(`${BASE_URL}/signin`, {
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
)

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
            signUp.fulfilled,
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
            signUp.rejected,
            (state: IInitialState, action) => {
                state.error = action.error.name;
            }
        );
        builder.addCase(
            signIn.fulfilled,
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
            signIn.rejected,
            (state: IInitialState, action) => {
                state.error = action.error.name;
            }
        );
    },
});

export const { removeToken } = authorizationSlice.actions;

export default authorizationSlice.reducer;
