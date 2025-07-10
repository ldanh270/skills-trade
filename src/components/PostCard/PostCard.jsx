import { formatDistanceToNow } from 'date-fns'
import React from 'react'

import proof from '~/assests/images/proof.png'
import { POST_TYPE } from '~/constants/objectAttributes/PostAttributes'

import * as styles from './PostCard.module.scss'
import ReactionButtons from './ReactionButtons/ReactionButtons'
import StarRating from './StarRating/StarRating'
import TagBadge from './TagBadge/TagBadge'

const PostCard = ({ post }) => {
    const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

    return (
        <div className={styles['container']}>
            <div className={styles['top']}>
                <TagBadge text={POST_TYPE[post.type]} />
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

            <div className={styles['info']}>
                <h2 className={styles['title']}>{post.title}</h2>
            </div>
            <div className={styles['service']}>
                <div className={styles['rating']}>
                    <span className={styles['rating__number']}>Rating: {post.rating}</span>
                    <StarRating value={post.rating} />
                </div>
                <ReactionButtons className={styles['reactions']} />
            </div>

            <div className={styles['tags']}>
                <TagBadge text="Web design" />
                <TagBadge text="UX-UI" />
                <TagBadge text="Javascript" />
                <TagBadge text="HTML" />
                <TagBadge text="CSS" />
                <TagBadge text="Search Engine Optimization" />
            </div>

            <p className={styles['description']}>{post.description}</p>

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
