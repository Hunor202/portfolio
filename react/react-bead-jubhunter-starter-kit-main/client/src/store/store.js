import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { jobApi } from './jobApiSlice'
import authSlice from './authSlice'

export const store = configureStore({
    reducer: {
        [jobApi.reducerPath]: jobApi.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jobApi.middleware),
})

setupListeners(store.dispatch)