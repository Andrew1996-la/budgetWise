import { configureStore } from '@reduxjs/toolkit';
import authorizationSlice from './authorizationSlice';
import categorySlice from './categorySlice';
import operationSlice from './operationSlice';

export const store = configureStore({
    reducer: {
        authorizationSlice,
        categorySlice,
        operationSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
