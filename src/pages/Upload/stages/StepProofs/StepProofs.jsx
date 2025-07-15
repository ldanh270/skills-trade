import { Image, Link2, SendHorizontal } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import styles from './StepProofs.module.scss'

export default function StepProofs({ formData, setFormData, next, prev }) {
    const [mediaFiles, setMediaFiles] = useState(formData.proofs?.files || [])
    const [mediaLinks, setMediaLinks] = useState(formData.proofs?.links || [])
    const [inputLink, setInputLink] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    const fileRef = useRef(null)

    // Upload images from file input
    const handleUpload = (e) => {
        const files = Array.from(e.target.files)
        const newFiles = files.map((file) => URL.createObjectURL(file))
        setMediaFiles((prev) => [...prev, ...newFiles])
    }

    // Sync media files/links to formData on change
    useEffect(() => {
        setFormData({
            ...formData,
            createdAt: new Date().toISOString(),
            proofs: { files: mediaFiles, links: mediaLinks },
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mediaFiles, mediaLinks])

    // Handle Add Link (via Enter or click)
    const addLink = () => {
        const trimmed = inputLink.trim()
        if (trimmed && !mediaLinks.includes(trimmed)) {
            setMediaLinks((prev) => [...prev, trimmed])
        }
        setInputLink('')
    }

    // Go to next step
    const handleNext = () => {
        setFormData({
            ...formData,
            createdAt: new Date().toISOString(),
            proofs: { files: mediaFiles, links: mediaLinks },
        })
        next()
    }

    return (
        <div className={styles['step-media']}>
            {/* Header */}
            <div className={styles['content']}>
                <h1 className={styles['title']}>Upload Proofs</h1>
                <p className={styles['description']}>
                    You can upload <strong>images</strong> or share a <strong>relevant link</strong>
                    .
                </p>

                {/* Link Input Field */}
                <div
                    className={`${styles['link-wrapper']} ${isFocused || inputLink ? styles['focused'] : ''}`}
                >
                    <Link2 className={styles['icon']} size={18} />
                    {!isFocused && !inputLink && (
                        <span className={styles['placeholder']}>
                            Paste a YouTube/GitHub/Website link...
                        </span>
                    )}
                    <div className={styles['input-group']}>
                        <input
                            type="text"
                            value={inputLink}
                            onChange={(e) => setInputLink(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onKeyDown={(e) => e.key === 'Enter' && addLink()}
                        />
                        <button className={styles['add-link-btn']} onClick={addLink}>
                            <SendHorizontal />
                        </button>
                    </div>
                </div>

                {/* Upload Images */}
                <div className={styles['upload-section']}>
                    <button
                        type="button"
                        className={styles['upload-btn']}
                        onClick={() => fileRef.current.click()}
                    >
                        <Image size={18} />
                        Upload Images
                    </button>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        ref={fileRef}
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                    />
                </div>

                {/* Preview Area */}
                {(mediaFiles.length > 0 || mediaLinks.length > 0) && (
                    <div className={styles['preview']}>
                        {/* Image Thumbnails */}
                        {mediaFiles.length > 0 && (
                            <div className={styles['image-preview']}>
                                {mediaFiles.map((file, index) => (
                                    <div className={styles['file-item']} key={index}>
                                        <img src={file} alt={`Proof ${index + 1}`} />
                                        <button
                                            className={styles['remove-btn']}
                                            onClick={() => {
                                                URL.revokeObjectURL(file)
                                                setMediaFiles((prev) =>
                                                    prev.filter((_, i) => i !== index),
                                                )
                                            }}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Link Preview (YouTube, GitHub, Others) */}
                        {mediaLinks.length > 0 && (
                            <div className={styles['link-preview']}>
                                {mediaLinks.map((link, index) => {
                                    const isGitHub = link.includes('github.com')

                                    return (
                                        <div className={styles['link-container']} key={index}>
                                            {isGitHub ? (
                                                <a
                                                    href={link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={styles['github-link']}
                                                >
                                                    <img
                                                        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                                                        alt="GitHub"
                                                    />
                                                    {link}
                                                </a>
                                            ) : (
                                                <a
                                                    className={styles['other-link']}
                                                    href={link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {link}
                                                </a>
                                            )}

                                            <button
                                                className={styles['remove-btn']}
                                                onClick={() =>
                                                    setMediaLinks((prev) =>
                                                        prev.filter((_, i) => i !== index),
                                                    )
                                                }
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className={styles['actions']}>
                <hr className={styles['separator']} />
                <div className={styles['buttons']}>
                    <button className={styles['back']} onClick={prev}>
                        Back
                    </button>
                    <button
                        className={`${styles['next']} ${styles['active']}`}
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
