import { Bookmark, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import { updateUser } from '~/api/apu-user'
import { dislikePost, likePost, savePost } from '~/redux/slices/userSlice'

import styles from './ReactionButtons.module.scss'

/**
 * ReactionButtons Component
 * Provides like, dislike, and save (bookmark) actions for a post.
 */
const ReactionButtons = ({ postId }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)

    // Check current reaction status
    const liked = user.likedPosts.includes(postId)
    const disliked = user.dislikedPosts.includes(postId)
    const bookmarked = user.savedPosts.includes(postId)

    // Handle Like Toggle
    const handleLike = async () => {
        const updatedLikedPosts = liked
            ? user.likedPosts.filter((id) => id !== postId)
            : [...user.likedPosts, postId]

        const updatedDislikedPosts = disliked
            ? user.dislikedPosts.filter((id) => id !== postId)
            : user.dislikedPosts

        dispatch(likePost(postId))
        await updateUser(user.id, {
            likedPosts: updatedLikedPosts,
            dislikedPosts: liked ? user.dislikedPosts : updatedDislikedPosts,
        })
    }

    // Handle Dislike Toggle
    const handleDislike = async () => {
        const updatedDislikedPosts = disliked
            ? user.dislikedPosts.filter((id) => id !== postId)
            : [...user.dislikedPosts, postId]

        const updatedLikedPosts = liked
            ? user.likedPosts.filter((id) => id !== postId)
            : user.likedPosts

        dispatch(dislikePost(postId))
        await updateUser(user.id, {
            dislikedPosts: updatedDislikedPosts,
            likedPosts: disliked ? user.likedPosts : updatedLikedPosts,
        })
    }

    // Handle Save Toggle
    const handleSave = async () => {
        const updatedSavedPosts = bookmarked
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
