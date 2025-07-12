import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
    },
})

export default postSlice.reducer
