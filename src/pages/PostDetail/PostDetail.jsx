import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getPostById } from '~/api/api-post'
import { updateUser } from '~/api/api-user'
import defaultAvatar from '~/assets/images/default.jpg'
import { setUser } from '~/redux/slices/userSlice'

import styles from './PostDetail.module.scss'

// Main component for displaying post details
const PostDetail = () => {
    // Current user from Redux
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    // Get postId from the URL params
    const { postId } = useParams()
    // Local state for post data, loading, and error
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [saving, setSaving] = useState(false)
    // State for save button hover effect
    const [saveHovered, setSaveHovered] = useState(false)

    // Fetch post data when component mounts or postId changes
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

    // Format date to readable string
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    // Calculate how many days ago the post was created
    const daysAgo = (dateString) => {
        const postDate = new Date(dateString)
        const today = new Date()
        const diffTime = Math.abs(today - postDate)
        return Math.floor(diffTime / (1000 * 60 * 60 * 24))
    }

    // Toggle save/unsave post
    const handleSavePost = async () => {
        if (!user || !user.id || !post) return
        setSaving(true)
        const isSaved = user.savedPosts.includes(post.id)
        let updatedSavedPosts
        if (isSaved) {
            // Unsave
            updatedSavedPosts = user.savedPosts.filter((id) => id !== post.id)
        } else {
            // Save
            updatedSavedPosts = [...user.savedPosts, post.id]
        }
        // Update backend
        await updateUser(user.id, { savedPosts: updatedSavedPosts })
        // Update Redux
        dispatch(setUser({ ...user, savedPosts: updatedSavedPosts }))
        setSaving(false)
    }

    // Loading state UI
    if (loading) {
        return <div className={styles['loading']}>Loading post...</div>
    }

    // Error state UI
    if (error) {
        return <div className={styles['error']}>Error: {error}</div>
    }

    // Not found state UI
    if (!post) {
        return <div className={styles['notFound']}>Post not found</div>
    }

    // Check if post is saved
    const isSaved = user && user.savedPosts && user.savedPosts.includes(post.id)

    // Main UI rendering
    return (
        <div className={styles['postDetail']}>
            {/* Main grid container: left = main content, right = sidebar */}
            <div className={styles['container']}>
                {/* Main post content section */}
                <div className={styles['postmain']}>
                    {/* Post header: type, title, author info, meta, description, skills */}
                    <div className={styles['postHeader']}>
                        {/* Post type badge */}
                        <span className={styles['postType']}>{post.type}</span>
                        {/* Post title */}
                        <h1 className={styles['postTitle']}>{post.title}</h1>

                        {/* Author info: avatar, name, rating */}
                        <div className={styles['authorInfo']}>
                            <img
                                src={post.author.avatar || defaultAvatar}
                                alt="Author avatar"
                                className={styles['authorAvatar']}
                            />
                            <div>
                                <div className={styles['authorName']}>{post.author.name}</div>
                                <div className={styles['authorRating']}>
                                    <span className={styles['ratingTitle']}>
                                        Rating: {post.rating}
                                    </span>
                                    <span className={styles['ratingStars']}>
                                        {'★'.repeat(Math.floor(post.rating))}
                                        {'☆'.repeat(5 - Math.floor(post.rating))}
                                    </span>
                                    <span></span>
                                </div>
                            </div>
                        </div>

                        {/* Meta info: price, date, location */}
                        <div className={styles['postMeta']}>
                            <div className={styles['metaItem']}>
                                <span className={styles['metaIcon']}>💰</span>
                                <span className={styles['priceRange']}>
                                    ${post.price.min} - ${post.price.max}
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

                        {/* Post description */}
                        <div className={styles['postDescription']}>
                            <p>{post.description}</p>
                        </div>

                        {/* Skills required section */}
                        <h3>Skills Required</h3>
                        <div className={styles['skillsContainer']}>
                            {post.skills.map((skill, index) => (
                                <span key={index} className={styles['skillTag']}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar section: actions, stats, author activity */}
                <div className={styles['postSidebar']}>
                    {/* Sidebar title */}
                    <h3 className={styles['sidebarTitle']}>About This Post</h3>

                    {/* Action buttons */}
                    <button className={`${styles['actionButton']} ${styles['primaryBtn']}`}>
                        Apply Now
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

                    {/* Post stats: type, budget, posted, author rating */}
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

                    {/* Author activity: followers, liked posts, saved posts, notifications, status */}
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
