import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
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
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },

        likePost: (state, action) => {
            const postId = action.payload
            const isLiked = state.user.likedPosts.includes(postId)

            if (isLiked) {
                // Hủy like
                state.user.likedPosts = state.user.likedPosts.filter((id) => id !== postId)
            } else {
                // Like mới → xóa khỏi dislike nếu có
                state.user.likedPosts.push(postId)
                state.user.dislikedPosts = state.user.dislikedPosts.filter((id) => id !== postId)
            }
        },

        dislikePost: (state, action) => {
            const postId = action.payload
            const isDisliked = state.user.dislikedPosts.includes(postId)

            if (isDisliked) {
                // Hủy dislike
                state.user.dislikedPosts = state.user.dislikedPosts.filter((id) => id !== postId)
            } else {
                // Dislike mới → xóa khỏi like nếu có
                state.user.dislikedPosts.push(postId)
                state.user.likedPosts = state.user.likedPosts.filter((id) => id !== postId)
            }
        },

        savePost: (state, action) => {
            const postId = action.payload
            const isSaved = state.user.savedPosts.includes(postId)

            if (isSaved) {
                // Bỏ lưu
                state.user.savedPosts = state.user.savedPosts.filter((id) => id !== postId)
            } else {
                // Lưu mới
                state.user.savedPosts.push(postId)
            }
        },
    },
})

export const { setUser, likePost, dislikePost, savePost } = userSlice.actions
export default userSlice.reducer
