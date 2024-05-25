import { configureStore } from '@reduxjs/toolkit';
import authorizationSlice from './authorizationSlice';
import categorySlice from './categorySlice';

export const store = configureStore({
    reducer: {
        authorizationSlice,
        categorySlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
