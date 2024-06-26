import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setErrorMessage } from '../utils';
import { BASE_URL, COMMAND_ID } from './const';

interface IInitialState {
    token: undefined | string;
    error: undefined | string;
    profile: {
        name?: string;
        email: string;
        signUpDate: string;
        password: string;
    };
    errorStatus: null | string;
    loadingStatus: boolean;
}

const initialState: IInitialState = {
    token: localStorage.getItem('token') || undefined,
    error: undefined,
    profile: {
        name: '',
        email: '',
        signUpDate: '',
        password: '',
    },
    errorStatus: null,
    loadingStatus: false,
};

export const getProfile = createAsyncThunk(
    'authorization/getProfile',
    async function () {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/profile`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return await response.json();
    }
);

export const setNickNameProfile = createAsyncThunk(
    'authorization/setNickNameProfile',
    async function (name) {
        const token = localStorage.getItem('token');
        const body = {
            name: name,
        };
        try {
            const response = await fetch(`${BASE_URL}/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return errorData;
            }

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
);

export const editNickNameProfile = createAsyncThunk(
    'authorization/editNickNameProfile',
    async function (name, { rejectWithValue }) {
        const token = localStorage.getItem('token');
        const body = {
            name: name,
        };

        try {
            const response = await fetch(`${BASE_URL}/profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const changePassword = createAsyncThunk(
    'authorization/changePassword',
    async function ({ password, newPassword }) {
        const token = localStorage.getItem('token');
        const body = {
            password: password,
            newPassword: newPassword,
        };
        const response = await fetch(`${BASE_URL}/profile/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        return await response.json();
    }
);

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
    async function (requestData: Record<string, string>) {
        const body = {
            email: requestData.email,
            password: requestData.password,
        };

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
        builder.addCase(signUp.fulfilled, (state: IInitialState, action) => {
            if (action.payload.errors) {
                const error = action.payload.errors[0];
                state.error = setErrorMessage(error.name);
            } else {
                state.token = action.payload.token;
                state.error = undefined;
                localStorage.setItem('token', action.payload.token);
            }
        });
        builder.addCase(signUp.rejected, (state: IInitialState, action) => {
            state.error = action.error.name;
        });
        builder.addCase(signIn.fulfilled, (state: IInitialState, action) => {
            if (action.payload.errors) {
                const error = action.payload.errors[0];
                state.error = setErrorMessage(error.name);
            } else {
                state.token = action.payload.token;
                state.error = undefined;
                localStorage.setItem('token', action.payload.token);
            }
        });
        builder.addCase(signIn.rejected, (state: IInitialState, action) => {
            state.error = action.error.name;
        });
        builder.addCase(
            getProfile.fulfilled,
            (state: IInitialState, action) => {
                state.loadingStatus = false;
                state.profile.email = action.payload.email;
                state.profile.signUpDate = action.payload.signUpDate;
                state.profile.name = action.payload.name;
            }
        );
        builder.addCase(getProfile.pending, (state: IInitialState) => {
            state.loadingStatus = true;
        });
        builder.addCase(getProfile.rejected, (state: IInitialState) => {
            state.loadingStatus = false;
        });
        builder.addCase(
            setNickNameProfile.fulfilled,
            (state: IInitialState, action) => {
                state.profile.name = action.payload.name;
            }
        );
        builder.addCase(
            editNickNameProfile.fulfilled,
            (state: IInitialState, action) => {
                state.profile.name = action.payload.name;
                state.errorStatus = null;
            }
        );
        builder.addCase(
            editNickNameProfile.rejected,
            (state: IInitialState, action) => {
                state.errorStatus = action.payload.errors[0].extensions.code;
            }
        );
        builder.addCase(
            changePassword.fulfilled,
            (state: IInitialState, action) => {
                state.profile.password = action.payload.password;
            }
        );
    },
});

export const { removeToken } = authorizationSlice.actions;

export default authorizationSlice.reducer;
