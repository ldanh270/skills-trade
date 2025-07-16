import { formatDistanceToNow } from 'date-fns'
import React from 'react'

import { POST_TYPE } from '~/constants/objectAttributes/PostAttributes'

import styles from './PostCard.module.scss'
import ReactionButtons from './ReactionButtons/ReactionButtons'
import StarRating from './StarRating/StarRating'
import TagBadge from './TagBadge/TagBadge'

const PostCard = ({ post, preview = false }) => {
    const timeAgo = post.createdAt
        ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
        : 'Unknown time'

    return (
        <div className={styles['container']}>
            {/* Top metadata line: type, time, price, author */}
            <div className={styles['top']}>
                <TagBadge name={POST_TYPE[post.type]} type="post" />
                <span className={`${styles['postedTime']} ${styles['meta']}`}>
                    Posted {timeAgo}
                </span>
                |
                <span className={`${styles['budget']} ${styles['meta']}`}>
                    Hourly:{' '}
                    {post.price.min === post.price.max
                        ? post.price.max
                        : `${post.price.min} - ${post.price.max}`}{' '}
                    points
                </span>
                |<span className={styles['name']}>Author: {post.author.name}</span>
            </div>

            {/* Title section */}
            <div className={styles['info']}>
                <h2 className={styles['title']}>{post.title}</h2>
            </div>

            {/* Rating + Reactions */}
            <div className={styles['service']}>
                <div className={styles['rating']}>
                    <span className={styles['rating__number']}>Rating: {post.rating}</span>
                    <StarRating value={post.rating} />
                </div>
                {!preview && <ReactionButtons postId={post.id} className={styles['reactions']} />}
            </div>

            {/* Skill tags */}
            <div className={styles['tags']}>
                {post.skills.map((skill, index) => (
                    <TagBadge key={index} name={skill} type="skill" />
                ))}
            </div>

            {/* Description */}
            <p className={styles['description']}>{post.description}</p>

            {/* Proof links */}
            <div className={styles['imageWrapper']}>
                {post.proofs.links.length > 0 && (
                    <div className={styles['link-preview']}>
                        {post.proofs.links.map((link, index) => (
                            <div className={styles['link-container']} key={index}>
                                {link.includes('youtube.com') || link.includes('youtu.be') ? (
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
                                    <a href={link} target="_blank" rel="noreferrer">
                                        {link}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {post.proofs.files.length > 0 && (
                    <div className={styles['image-preview']}>
                        {post.proofs.files.map((proof, index) => (
                            <img
                                key={index}
                                src={proof}
                                alt="Proof"
                                className={styles['proof-image']}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostCard
