import { Image, Link2, SendHorizontal } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import styles from './StepProofs.module.scss'

// ----- STEP PROOFS COMPONENT -----
export default function StepProofs({ formData, setFormData, next, prev }) {
    // ----- STATE -----
    const [mediaFiles, setMediaFiles] = useState(formData.proofs?.files || [])
    const [mediaLinks, setMediaLinks] = useState(formData.proofs?.links || [])
    const [inputLink, setInputLink] = useState('')

    const [isFocused, setIsFocused] = useState(false)

    const fileRef = useRef(null)

    // ----- HANDLE UPLOAD -----
    const handleUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const newFile = URL.createObjectURL(file)
            // Only keep the latest selected image
            setMediaFiles([newFile])
        }
    }

    // ----- UPDATE FORM DATA ON MEDIA CHANGE -----
    useEffect(() => {
        setFormData({
            ...formData,
            createdAt: new Date().toISOString(),
            proofs: {
                files: mediaFiles,
                links: mediaLinks,
            },
        })
        console.log('Media updated:', { files: mediaFiles, links: mediaLinks })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mediaFiles, mediaLinks])

    // ----- RENDER -----
    return (
        <div className={styles['step-media']}>
            <div className={styles['content']}>
                <h1 className={styles['title']}>Upload Proofs</h1>
                <p className={styles['description']}>
                    You can upload <strong>images</strong> or share a <strong>relevant link</strong>
                    .
                </p>

                {/* ----- LINK INPUT ----- */}
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && inputLink.trim() !== '') {
                                    if (!mediaLinks.includes(inputLink.trim())) {
                                        setMediaLinks((prev) => [...prev, inputLink.trim()])
                                    }
                                    setInputLink('')
                                }
                            }}
                        />
                        <button
                            className={styles['add-link-btn']}
                            onClick={() => {
                                if (
                                    inputLink.trim() !== '' &&
                                    !mediaLinks.includes(inputLink.trim())
                                ) {
                                    setMediaLinks((prev) => [...prev, inputLink.trim()])
                                    setInputLink('')
                                }
                            }}
                        >
                            <SendHorizontal />
                        </button>
                    </div>
                </div>
                {/* ----- UPLOAD IMAGE ----- */}
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
                        accept="image/*"
                        ref={fileRef}
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                    />
                </div>

                {/* ----- PREVIEW PROOFS ----- */}
                {(mediaFiles.length > 0 || mediaLinks.length > 0) && (
                    <div className={styles['preview']}>
                        {/* ----- LINK PREVIEW ----- */}
                        {mediaLinks.length > 0 && (
                            <div className={styles['link-preview']}>
                                {mediaLinks.map((link, index) => (
                                    <div className={styles['link-container']} key={index}>
                                        {link.includes('youtube.com') ||
                                        link.includes('youtu.be') ? (
                                            <iframe
                                                width="100%"
                                                height="315"
                                                src={
                                                    link.includes('watch?v=')
                                                        ? link.replace('watch?v=', 'embed/')
                                                        : link.replace(
                                                              'youtu.be/',
                                                              'www.youtube.com/embed/',
                                                          )
                                                }
                                                title="YouTube video"
                                                allowFullScreen
                                            ></iframe>
                                        ) : link.includes('github.com') ? (
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
                                                href={link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={styles['link-container']}
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
                                ))}
                            </div>
                        )}

                        {/* ----- IMAGE PREVIEW ----- */}
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
                    </div>
                )}
            </div>
            {/* ----- ACTIONS BAR ----- */}
            <div className={styles['actions']}>
                <hr className={styles['separator']} />
                <div className={styles['buttons']}>
                    <button className={styles['back']} onClick={prev}>
                        Back
                    </button>
                    <button
                        className={`${styles['next']} ${mediaFiles.length > 0 || mediaLinks.length > 0 ? styles['active'] : styles['disabled']}`}
                        onClick={() => {
                            if (mediaFiles.length > 0 || mediaLinks.length > 0) {
                                setFormData({
                                    ...formData,
                                    createdAt: new Date().toISOString(),
                                    proofs: {
                                        files: mediaFiles,
                                        links: mediaLinks,
                                    },
                                })
                                next()
                            }
                        }}
                        disabled={!(mediaFiles.length > 0 || mediaLinks.length > 0)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
