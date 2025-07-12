import { Bookmark, ThumbsDown, ThumbsUp } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateUser } from '~/api/user'
import { dislikePost, likePost, savePost } from '~/redux/slices/userSlice'

import styles from './ReactionButtons.module.scss'

const ReactionButtons = ({ postId }) => {
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    const liked = useSelector((state) => state.user.user.likedPosts.includes(postId))
    const disliked = useSelector((state) => state.user.user.dislikedPosts.includes(postId))
    const bookmarked = useSelector((state) => state.user.user.savedPosts.includes(postId))

    const handleLike = async () => {
        const isLiked = user.likedPosts.includes(postId)
        const isDisliked = user.dislikedPosts.includes(postId)

        const updatedLikedPosts = isLiked
            ? user.likedPosts.filter((id) => id !== postId)
            : [...user.likedPosts, postId]

        const updatedDislikedPosts = isDisliked
            ? user.dislikedPosts.filter((id) => id !== postId)
            : user.dislikedPosts

        dispatch(likePost(postId))
        await updateUser(user.id, {
            likedPosts: updatedLikedPosts,
            dislikedPosts: isLiked ? user.dislikedPosts : updatedDislikedPosts,
        })
    }

    const handleDislike = async () => {
        const isDisliked = user.dislikedPosts.includes(postId)
        const isLiked = user.likedPosts.includes(postId)

        const updatedDislikedPosts = isDisliked
            ? user.dislikedPosts.filter((id) => id !== postId)
            : [...user.dislikedPosts, postId]

        const updatedLikedPosts = isLiked
            ? user.likedPosts.filter((id) => id !== postId)
            : user.likedPosts

        dispatch(dislikePost(postId))
        await updateUser(user.id, {
            dislikedPosts: updatedDislikedPosts,
            likedPosts: isDisliked ? user.likedPosts : updatedLikedPosts,
        })
    }

    const handleSave = async () => {
        const isSaved = user.savedPosts.includes(postId)

        const updatedSavedPosts = isSaved
            ? user.savedPosts.filter((id) => id !== postId)
            : [...user.savedPosts, postId]

        dispatch(savePost(postId))
        await updateUser(user.id, {
            savedPosts: updatedSavedPosts,
        })
    }

    return (
        <div className={styles['reactions']}>
            <button onClick={handleLike}>
                <ThumbsUp className={liked ? styles['active'] : styles['inactive']} size={20} />
            </button>
            <button onClick={handleDislike}>
                <ThumbsDown
                    className={disliked ? styles['active'] : styles['inactive']}
                    size={20}
                />
            </button>
            <button onClick={handleSave}>
                <Bookmark
                    className={bookmarked ? styles['active'] : styles['inactive']}
                    size={20}
                />
            </button>
        </div>
    )
}

export default ReactionButtons
