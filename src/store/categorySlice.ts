import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from './const';

interface IInitialState {
    category: string[];
}

const initialState: IInitialState = {
    category: [],
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
    },
});

export default categorySlice.reducer;
