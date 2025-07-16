import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getPostById } from '~/api/api-post'

import styles from './PostDetail.module.scss'

const PostDetail = () => {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    if (loading) {
        return <div className={styles['loading']}>Loading post...</div>
    }

    if (error) {
        return <div className={styles['error']}>Error: {error}</div>
    }

    if (!post) {
        return <div className={styles['notFound']}>Post not found</div>
    }

    return (
        <div className={styles['postDetail']}>
            <div className={styles['container']}>
                <div className={styles['postMain']}>
                    <div className={styles['postHeader']}>
                        <span className={styles['postType']}>{post.type}</span>
                        <h1 className={styles['postTitle']}>{post.title}</h1>

                        <div className={styles['authorInfo']}>
                            <img
                                src={post.author.avatar}
                                alt="Author avatar"
                                className={styles['authorAvatar']}
                            />
                            <div>
                                <div className={styles['authorName']}>{post.author.name}</div>
                                <div className={styles['authorRating']}>
                                    <span className={styles['ratingStars']}>
                                        {'★'.repeat(Math.floor(post.author.rating))}
                                        {'☆'.repeat(5 - Math.floor(post.author.rating))}
                                    </span>
                                    <span>
                                        {post.author && post.author.rating
                                            ? post.author.rating.toFixed(1)
                                            : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>

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

                        <div className={styles['postDescription']}>
                            <p>{post.description}</p>
                        </div>

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

                <div className={styles['postSidebar']}>
                    <h3 className={styles['sidebarTitle']}>About This Post</h3>

                    <button className={`${styles['actionButton']} ${styles['primaryBtn']}`}>
                        Apply Now
                    </button>
                    <button className={`${styles['actionButton']} ${styles['secondaryBtn']}`}>
                        Save Post
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
                            <span className={styles['statValue']}>
                                {post.author && post.author.rating
                                    ? post.author.rating.toFixed(1)
                                    : 'N/A'}{' '}
                                ★
                            </span>
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
                            <span>Status:</span>
                            <span>
                                {post.author && post.author.status
                                    ? post.author.status.charAt(0).toUpperCase() +
                                      post.author.status.slice(1)
                                    : 'N/A'}
                                <span
                                    className={`${styles['statusBadge']} ${styles[post.author.status]}`}
                                ></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetail
