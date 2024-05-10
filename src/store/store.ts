import { configureStore } from '@reduxjs/toolkit';
import authorizationSlice from './authorizationSlice';

export const store = configureStore({
    reducer: {
        authorizationSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
