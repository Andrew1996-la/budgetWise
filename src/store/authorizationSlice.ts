import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL, COMMAND_ID } from './const';

interface IInitialState {
    token: string;
}

const initialState: IInitialState = {
    token: localStorage.getItem('token') || '',
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

            if (!response.ok) {
                throw new Error('Failed to fetch authorization');
            }

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
);

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            setTokenThunk.fulfilled,
            (state: IInitialState, action) => {
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            }
        );
    },
});

export default authorizationSlice.reducer;
