import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import React, { useEffect, useId, useState } from 'react'
import { useSelector } from 'react-redux'

import { createPost } from '~/api/api-post' // Import the API function to create a post
import PostCard from '~/components/PostCard/PostCard'

import styles from './StepSubmit.module.scss'

export default function StepSubmit({ formData, setFormData, prev }) {
    const [status, setStatus] = useState('idle') // idle | pending | success | failed
    const user = useSelector((state) => state.user.user)
    // console.log(user)
    useEffect(() => {
        setFormData({
            ...formData,
            id: uniqueID,
            author: {
                id: user.id,
                name: user.fullName,
            },
            rating: user.rating,
            createdAt: new Date().toISOString(),
        })
        console.log(formData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Create unique ID for the post
    const uniqueID = useId()

    const handleSubmit = async () => {
        const submitData = {
            ...formData,
            proofs: formData.proofs || { files: [], links: [] }, // Đảm bảo proofs tồn tại
            skills: formData.skills || [],
            price: formData.price || { min: 0, max: 0 },
        }
        setStatus('pending')
        try {
            await createPost(submitData)
            setStatus('success')
        } catch (err) {
            console.error(err)
            setStatus('failed')
        }
    }

    const renderStatus = () => {
        // Common styles
        const containerStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh',
            textAlign: 'center',
            padding: '2rem',
        }

        const iconStyle = {
            width: '64px',
            height: '64px',
            strokeWidth: '1.5',
            marginBottom: '2rem',
        }

        const textStyle = {
            fontSize: '2rem',
            fontWeight: '500',
            marginBottom: '3rem',
        }

        const buttonsContainerStyle = {
            display: 'flex',
            gap: '1.5rem',
            marginTop: '2rem',
        }

        const primaryButtonStyle = {
            padding: '1.2rem 2.5rem',
            fontSize: '1.2rem',
            fontWeight: '600',
            borderRadius: '2rem',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#ffc107',
            color: '#333',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s',
        }

        const secondaryButtonStyle = {
            ...primaryButtonStyle,
            backgroundColor: '#f0f0f0',
            color: '#666',
            boxShadow: 'none',
        }

        switch (status) {
            case 'pending':
                return (
                    <div style={{ ...containerStyle, color: '#666' }}>
                        <Loader2 style={{ ...iconStyle, animation: 'spin 1s linear infinite' }} />
                        <p style={textStyle}>Submitting your post...</p>
                    </div>
                )

            case 'success':
                return (
                    <div style={{ ...containerStyle, color: '#4CAF50' }}>
                        <CheckCircle style={iconStyle} />
                        <p style={textStyle}>Post submitted successfully!</p>
                        <div style={buttonsContainerStyle}>
                            <button
                                style={primaryButtonStyle}
                                onClick={() => (window.location.href = '/')} // Return to home
                            >
                                Return to Home
                            </button>
                            <button
                                style={secondaryButtonStyle}
                                onClick={() => window.location.reload()} // Create new post
                            >
                                Create New Post
                            </button>
                        </div>
                    </div>
                )

            case 'failed':
                return (
                    <div style={{ ...containerStyle, color: '#F44336' }}>
                        <XCircle style={iconStyle} />
                        <p style={textStyle}>Submission failed. Please try again.</p>
                        <div style={buttonsContainerStyle}>
                            <button
                                style={primaryButtonStyle}
                                onClick={handleSubmit} // Try again
                            >
                                Try Again
                            </button>
                            <button
                                style={secondaryButtonStyle}
                                onClick={() => (window.location.href = '/')} // Return to home
                            >
                                Return to Home
                            </button>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className={styles['step-submit']}>
            {status === 'idle' && (
                <div className={styles['content']}>
                    <h1 className={styles['title']}>Submit Post</h1>
                    <p className={styles['description']}>
                        Please review your post before submitting. Once submitted, it will appear on
                        the feed.
                    </p>
                    <PostCard post={formData} preview />
                </div>
            )}
            {status !== 'idle' && renderStatus()}

            {status === 'idle' && (
                <div className={styles['actions']}>
                    <hr className={styles['separator']} />
                    <div className={styles['buttons']}>
                        <button className={styles['back']} onClick={prev}>
                            Back
                        </button>
                        <button
                            className={`${styles['submit']} ${status === 'pending' ? styles['disabled'] : ''}`}
                            onClick={handleSubmit}
                            disabled={status === 'pending'}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
