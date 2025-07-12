import { createSlice } from '@reduxjs/toolkit'

// Slice for managing post list, pagination, and filters
const postSlice = createSlice({
    name: 'posts',

    // Initial post-related state
    initialState: {
        posts: [],
        page: 1,
        hasMore: true,
        filters: {
            type: '',
            rating: 0,
            skills: [],
            pointMin: 0,
            pointMax: 9999,
        },
    },

    // Reducers for manipulating post state
    reducers: {
        // Replace all posts
        setPosts: (state, action) => {
            state.posts = action.payload
        },

        // Append new posts to existing list
        appendPosts: (state, action) => {
            state.posts = [...state.posts, ...action.payload]
        },

        // Set current pagination page
        setPage: (state, action) => {
            state.page = action.payload
        },

        // Set whether there are more posts to load
        setHasMore: (state, action) => {
            state.hasMore = action.payload
        },

        // Update filter criteria and reset post list
        setFilters: (state, action) => {
            state.filters = action.payload

            // Reset pagination and post list when filters change
            state.page = 1
            state.hasMore = true
            state.posts = []
        },
    },
})

// Export action creators
export const { setPosts, appendPosts, setPage, setHasMore, setFilters } = postSlice.actions

// Export reducer
export default postSlice.reducer
