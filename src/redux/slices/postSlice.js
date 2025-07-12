import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'posts',
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
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        appendPosts: (state, action) => {
            state.posts = [...state.posts, ...action.payload]
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload
        },
        setFilters: (state, action) => {
            state.filters = action.payload
            state.page = 1
            state.hasMore = true
            state.posts = [] // reset post khi đổi filter
        },
    },
})

export const { setPosts, appendPosts, setPage, setHasMore, setFilters } = postSlice.actions
export default postSlice.reducer
