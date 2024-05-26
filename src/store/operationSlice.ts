import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from './const';

export interface IOperation {
    name: string;
    desc?: string;
    amount: number;
    date: string;
    type: 'Profit' | 'Cost';
    categoryId: string;
}

interface IInitialState {
    operationList: IOperation[];
}

const initialState: IInitialState = {
    operationList: [],
};

export const createOperationThunk = createAsyncThunk(
    'operationSlice/createOperationThunk',
    async (data: IOperation) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BASE_URL}/operations`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
);

export const getOperationThunk = createAsyncThunk(
    'operationSlice/getOperationThunk',
    async () => {
        const token = localStorage.getItem('token');
        try {
            const response = fetch(`${BASE_URL}/operations`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return (await response).json();
        } catch (error) {
            console.error(error);
        }
    }
);

const operationSlice = createSlice({
    name: 'operationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            createOperationThunk.fulfilled,
            (state: IInitialState, action) => {
                state.operationList.push(action.payload);
            }
        );
        builder.addCase(
            getOperationThunk.fulfilled,
            (state: IInitialState, action) => {
                state.operationList = action.payload.data;
            }
        );
    },
});

export default operationSlice.reducer;
