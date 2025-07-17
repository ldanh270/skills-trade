import { createSlice } from '@reduxjs/toolkit'

// Slice for managing user state and post interactions
const userSlice = createSlice({
    name: 'user',

    // Initial user state
    initialState: {
        user: {
            id: '',
            fullName: '',
            email: '',
            likedPosts: [],
            dislikedPosts: [],
            savedPosts: [],
            follower: [],
            following: [],
        },
    },

    // Reducers for user actions
    reducers: {
        // Set the entire user object
        setUser: (state, action) => {
            state.user = action.payload
        },

        // Toggle like on a post
        likePost: (state, action) => {
            const postId = action.payload
            const isLiked = state.user.likedPosts.includes(postId)

            if (isLiked) {
                // Remove like
                state.user.likedPosts = state.user.likedPosts.filter((id) => id !== postId)
            } else {
                // Add like and remove from dislikes if exists
                state.user.likedPosts.push(postId)
                state.user.dislikedPosts = state.user.dislikedPosts.filter((id) => id !== postId)
            }
        },

        // Toggle dislike on a post
        dislikePost: (state, action) => {
            const postId = action.payload
            const isDisliked = state.user.dislikedPosts.includes(postId)

            if (isDisliked) {
                // Remove dislike
                state.user.dislikedPosts = state.user.dislikedPosts.filter((id) => id !== postId)
            } else {
                // Add dislike and remove from likes if exists
                state.user.dislikedPosts.push(postId)
                state.user.likedPosts = state.user.likedPosts.filter((id) => id !== postId)
            }
        },

        // Toggle save/unsave a post
        savePost: (state, action) => {
            const postId = action.payload
            const isSaved = state.user.savedPosts.includes(postId)

            if (isSaved) {
                // Unsave post
                state.user.savedPosts = state.user.savedPosts.filter((id) => id !== postId)
            } else {
                // Save post
                state.user.savedPosts.push(postId)
            }
        },
    },
})

// Export action creators
export const { setUser, likePost, dislikePost, savePost } = userSlice.actions

// Export reducer
export default userSlice.reducer
