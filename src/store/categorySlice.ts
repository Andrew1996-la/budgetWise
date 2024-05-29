import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from './const';

export type Category = {
    id: string;
    name: string;
    photo?: string;
    createdAt: Date;
    updatedAt: Date;
    commandId: string;
};

interface IInitialState {
    category: Category[];
    error: null | string;
    loading: boolean;
}

const initialState: IInitialState = {
    category: [],
    error: null,
    loading: false,
};

export const createCategoryThunk = createAsyncThunk(
    'categorySlice/createCategoryThunk',
    async (categoryText: string) => {
        const token = localStorage.getItem('token');
        const body = {
            name: categoryText,
        };

        try {
            const response = await fetch(`${BASE_URL}/categories`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
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

export const getCategoryThunk = createAsyncThunk(
    'categorySlice/getCategoryThunk',
    async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/categories`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    }
);

export const removeCategoryThunk = createAsyncThunk(
    'categoySlice/removeCategoryThunk',
    async (id: string) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    }
);

export const editCategoryThunk = createAsyncThunk(
    'categoySlice/editCategoryThunk',
    async ({
        id,
        categoryText,
    }: {
        id: string | undefined;
        categoryText: any;
    }) => {
        const token = localStorage.getItem('token');
        const body = {
            name: categoryText,
        };
        const response = await fetch(`${BASE_URL}/categories/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await response.json();
    }
);

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            createCategoryThunk.fulfilled,
            (state: IInitialState, action) => {
                state.category.push(action.payload);
            }
        );
        builder.addCase(
            getCategoryThunk.fulfilled,
            (state: IInitialState, action) => {
                state.loading = false;
                state.category = action.payload.data;
            }
        );
        builder.addCase(getCategoryThunk.pending, (state: IInitialState) => {
            state.loading = true;
        });
        builder.addCase(getCategoryThunk.rejected, (state: IInitialState) => {
            state.loading = false;
        });
        builder.addCase(
            removeCategoryThunk.fulfilled,
            (state: IInitialState, action) => {
                state.category = state.category.filter(
                    (category) => category.id !== action.payload
                );
            }
        );
        builder.addCase(
            editCategoryThunk.fulfilled,
            (state: IInitialState, action) => {
                const index = state.category.findIndex(
                    (category) => category.id === action.payload.id
                );
                if (index !== -1) {
                    state.category[index] = action.payload;
                }
            }
        );
    },
});

export default categorySlice.reducer;
