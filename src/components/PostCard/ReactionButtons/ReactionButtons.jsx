import { Bookmark, BookmarkPlus, ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'

import * as styles from './ReactionButtons.module.scss'

const ReactionButtons = () => {
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)

    const handleLike = async () => {
        const newLiked = !liked
        setLiked(newLiked)
        if (disliked && newLiked) setDisliked(false)
    }

    const handleDislike = async () => {
        const newDisliked = !disliked
        setDisliked(newDisliked)
        if (liked && newDisliked) setLiked(false)
    }

    const handleBookmark = async () => {
        const newBookmarked = !bookmarked
        setBookmarked(newBookmarked)
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
            <button onClick={handleBookmark}>
                <Bookmark
                    className={bookmarked ? styles['active'] : styles['inactive']}
                    size={20}
                />
            </button>
        </div>
    )
}

export default ReactionButtons
