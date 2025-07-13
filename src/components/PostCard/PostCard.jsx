import { formatDistanceToNow } from 'date-fns'
import React from 'react'

import { POST_TYPE } from '~/constants/objectAttributes/PostAttributes'

import * as styles from './PostCard.module.scss'
import ReactionButtons from './ReactionButtons/ReactionButtons'
import StarRating from './StarRating/StarRating'
import TagBadge from './TagBadge/TagBadge'

const PostCard = ({ post }) => {
    const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

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
                <ReactionButtons postId={post.id} className={styles['reactions']} />
            </div>

            {/* Skill tags */}
            <div className={styles['tags']}>
                {post.skills.map((skill, index) => (
                    <TagBadge key={index} name={skill} type="skill" />
                ))}
            </div>

            {/* Description */}
            <p className={styles['description']}>{post.description}</p>

            {/* Proof images */}
            <div className={styles['imageWrapper']}>
                {post.proofs.length > 0 &&
                    post.proofs.map((proof, index) => (
                        <img key={index} src={proof} alt="Proof" className={styles['proof']} />
                    ))}
            </div>
        </div>
    )
}

export default PostCard
