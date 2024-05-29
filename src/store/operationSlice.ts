import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from './const';

export interface IOperation {
    id: string;
    name: string;
    desc?: string;
    amount: number;
    date: string;
    type: 'Profit' | 'Cost';
    categoryId: string;
    category: {
        commandId: string;
        createdAt: string;
        id: string;
        name: string;
        updatedAt: string;
    };
}

interface IInitialState {
    operationList: IOperation[];
    error: null | string;
    loading: boolean;
}

const initialState: IInitialState = {
    operationList: [],
    error: null,
    loading: false,
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

export const removeOperationThunk = createAsyncThunk(
    'operationSlice/removeOperationThunk',
    async (id: string) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/operations/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return await response.json();
    }
);

export const editOperationThunk = createAsyncThunk(
    'operationSlice/editOperationThunk',
    async ({
        operationId,
        data,
    }: {
        operationId: string | undefined;
        data: IOperation;
    }) => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_URL}/operations/${operationId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
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
                state.loading = false;
                state.operationList = action.payload.data;
            }
        );
        builder.addCase(getOperationThunk.pending, (state: IInitialState) => {
            state.loading = true;
        });
        builder.addCase(getOperationThunk.rejected, (state: IInitialState) => {
            state.loading = false;
        });

        builder.addCase(
            removeOperationThunk.fulfilled,
            (state: IInitialState, action) => {
                state.operationList = state.operationList.filter(
                    (opearation) => opearation.categoryId !== action.payload
                );
            }
        );
        builder.addCase(
            editOperationThunk.fulfilled,
            (state: IInitialState, action) => {
                const index = state.operationList.findIndex(
                    (opearation) => opearation.id === action.payload.id
                );
                if (index !== -1) {
                    state.operationList[index] = action.payload;
                }
            }
        );
    },
});

export default operationSlice.reducer;
