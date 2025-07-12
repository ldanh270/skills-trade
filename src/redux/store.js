import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        user: {},
        posts: {},
    },
})

export default store
