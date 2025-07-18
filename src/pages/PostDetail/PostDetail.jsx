import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getPostById } from '~/api/api-post'
import { updateUser } from '~/api/api-user'
import defaultAvatar from '~/assets/images/default.jpg'
import ConfirmationModal from '~/pages/PostDetail/ConfirmationModal/ConfirmationModal'
import { setUser } from '~/redux/slices/userSlice'

import styles from './PostDetail.module.scss'
import Toast from './Toast/Toast'

const PostDetail = () => {
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [saving, setSaving] = useState(false)
    const [saveHovered, setSaveHovered] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [applying, setApplying] = useState(false)
    const [applied, setApplied] = useState(false)
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: '', // 'loading', 'success', 'error'
    })
    const [applyHovered, setApplyHovered] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postData = await getPostById(postId)
                setPost(postData)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchPost()
    }, [postId])

    const showToast = (message, type) => {
        setToast({ show: true, message, type })
    }

    const hideToast = () => {
        setToast({ ...toast, show: false })
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const daysAgo = (dateString) => {
        const postDate = new Date(dateString)
        const today = new Date()
        const diffTime = Math.abs(today - postDate)
        return Math.floor(diffTime / (1000 * 60 * 60 * 24))
    }

    const handleSavePost = async () => {
        if (!user || !user.id || !post) return
        setSaving(true)
        const isSaved = user.savedPosts.includes(post.id)
        let updatedSavedPosts
        if (isSaved) {
            updatedSavedPosts = user.savedPosts.filter((id) => id !== post.id)
            showToast('Post unsaved', 'success')
        } else {
            updatedSavedPosts = [...user.savedPosts, post.id]
            showToast('Post saved', 'success')
        }
        await updateUser(user.id, { savedPosts: updatedSavedPosts })
        dispatch(setUser({ ...user, savedPosts: updatedSavedPosts }))
        setSaving(false)
    }

    const handleApplyClick = () => {
        setShowConfirm(true)
    }

    const handleConfirmApply = async () => {
        setApplying(true)
        showToast('Applying to post...', 'loading')

        try {
            // TODO: Replace with actual API call for applying to post
            // await applyToPost(post.id, user.id)
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

            setApplying(false)
            setApplied(true)
            showToast('Applied successfully!', 'success')
        } catch (error) {
            setApplying(false)
            showToast('Failed to apply. Please try again.', 'error')
            console.error('Apply error:', error)
        }
    }

    const handleUnapply = async () => {
        setApplying(true)
        showToast('Unapplying...', 'loading')
        try {
            // TODO: Gọi API unapply nếu có
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setApplying(false)
            setApplied(false)
            showToast('Unapplied!', 'success')
        } catch (error) {
            setApplying(false)
            showToast('Failed to unapply.', error.message)
        }
    }

    if (loading) {
        return <div className={styles['loading']}>Loading post...</div>
    }

    if (error) {
        return <div className={styles['error']}>Error: {error}</div>
    }

    if (!post) {
        return <div className={styles['notFound']}>Post not found</div>
    }

    const isSaved = user && user.savedPosts && user.savedPosts.includes(post.id)

    return (
        <div className={styles['postDetail']}>
            <ConfirmationModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirmApply}
                title="Apply for this post?"
                message="Are you sure you want to apply for this post? This action cannot be undone."
                confirmText={applying ? 'Applying...' : 'Yes, Apply'}
                cancelText="Cancel"
                confirmButtonClass="primary"
                cancelButtonClass="secondary"
            />

            {/* Toast Notification */}
            {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

            <div className={styles['container']}>
                <div className={styles['postmain']}>
                    <div className={styles['postHeader']}>
                        <span
                            className={
                                `${styles['postType']} ` +
                                (post.type === 'Offer'
                                    ? styles['offer']
                                    : post.type === 'Hire'
                                      ? styles['hire']
                                      : '')
                            }
                        >
                            {post.type}
                        </span>
                        <h1 className={styles['postTitle']}>{post.title}</h1>

                        <div className={styles['authorInfo']}>
                            <img
                                src={post.author?.avatar || defaultAvatar}
                                alt="Author avatar"
                                className={styles['authorAvatar']}
                            />
                            <div>
                                <div className={styles['authorName']}>{post.author?.name}</div>
                                <div className={styles['authorRating']}>
                                    <span className={styles['ratingTitle']}>
                                        Rating: {post.rating}
                                    </span>
                                    <span className={styles['ratingStars']}>
                                        {'★'.repeat(Math.floor(post.rating))}
                                        {'☆'.repeat(5 - Math.floor(post.rating))}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles['postMeta']}>
                            <div className={styles['metaItem']}>
                                <span className={styles['metaIcon']}>💰</span>
                                <span className={styles['priceRange']}>
                                    ${post.price?.min} - ${post.price?.max}
                                </span>
                            </div>
                            <div className={styles['metaItem']}>
                                <span className={styles['metaIcon']}>📅</span>
                                <span>Posted on {formatDate(post.createdAt)}</span>
                            </div>
                            <div className={styles['metaItem']}>
                                <span className={styles['metaIcon']}>📍</span>
                                <span>{post.location || 'Ho Chi Minh'}</span>
                            </div>
                        </div>

                        <div className={styles['postDescription']}>
                            <p>{post.description}</p>
                        </div>

                        <h3>Skills Required</h3>
                        <div className={styles['skillsContainer']}>
                            {post.skills?.map((skill, index) => (
                                <span key={index} className={styles['skillTag']}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles['postSidebar']}>
                    <h3 className={styles['sidebarTitle']}>About This Post</h3>

                    <button
                        className={`${styles['actionButton']} ${styles['primaryBtn']}`}
                        onClick={applied ? handleUnapply : handleApplyClick}
                        disabled={applying}
                        onMouseEnter={() => applied && setApplyHovered(true)}
                        onMouseLeave={() => applied && setApplyHovered(false)}
                    >
                        {applying
                            ? 'Applying...'
                            : applied
                              ? applyHovered
                                  ? 'Undo Apply'
                                  : 'Applied'
                              : 'Apply Now'}
                    </button>
                    <button
                        className={`${styles['actionButton']} ${styles['secondaryBtn']} ${isSaved ? styles['saved'] : ''}`}
                        onClick={handleSavePost}
                        disabled={saving}
                        onMouseEnter={() => isSaved && setSaveHovered(true)}
                        onMouseLeave={() => isSaved && setSaveHovered(false)}
                    >
                        {isSaved ? (saveHovered ? 'Unsave' : 'Saved') : 'Save Post'}
                    </button>

                    <div className={styles['postStats']}>
                        <div className={styles['statItem']}>
                            <span>Post Type:</span>
                            <span className={styles['statValue']}>{post.type}</span>
                        </div>
                        <div className={styles['statItem']}>
                            <span>Budget:</span>
                            <span className={styles['statValue']}>
                                ${post.price.min} - ${post.price.max}
                            </span>
                        </div>
                        <div className={styles['statItem']}>
                            <span>Posted:</span>
                            <span className={styles['statValue']}>
                                {daysAgo(post.createdAt)} days ago
                            </span>
                        </div>
                        <div className={styles['statItem']}>
                            <span>Author Rating:</span>
                            <span className={styles['statValue']}>{post.rating} ★</span>
                        </div>
                    </div>

                    <div className={styles['authorActivity']}>
                        <h3 className={styles['sidebarTitle']}>Author Activity</h3>

                        <div className={styles['activityItem']}>
                            <span className={styles['activityIcon']}>👥</span>
                            <span>{post.author.followers} Followers</span>
                        </div>
                        <div className={styles['activityItem']}>
                            <span className={styles['activityIcon']}>❤️</span>
                            <span>{post.author.likedPosts} Liked Posts</span>
                        </div>
                        <div className={styles['activityItem']}>
                            <span className={styles['activityIcon']}>💾</span>
                            <span>{post.author.savedPosts} Saved Post</span>
                        </div>
                        <div className={styles['activityItem']}>
                            <span className={styles['activityIcon']}>🔔</span>
                            <span>{post.author.unreadNotifications} Unread Notification</span>
                        </div>
                        <div className={styles['activityItem']}>
                            <span className={styles['activityIcon']}>⭕</span>
                            <span>Status</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetail
