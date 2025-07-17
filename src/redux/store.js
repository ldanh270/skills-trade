import { configureStore } from '@reduxjs/toolkit'

// Import individual reducers
import postReducer from './slices/postSlice'
import userReducer from './slices/userSlice'

// Create the Redux store
const store = configureStore({
    reducer: {
        // User state slice
        user: userReducer,

        // Post state slice
        post: postReducer,
    },

    // Optional: Enable Redux DevTools & customize middleware
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    // devTools: process.env.NODE_ENV !== 'production',
})

export default store
