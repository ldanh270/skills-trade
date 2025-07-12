import { Star, StarOff } from 'lucide-react'
import React from 'react'

import * as styles from './StarRating.module.scss'

const StarRating = ({ value }) => {
    return (
        <div className={styles['stars']}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={20}
                    className={i < value ? `${styles['star']} ${styles['filled']}` : styles['star']}
                    title={`Rated ${i}`}
                />
            ))}
        </div>
    )
}

export default StarRating
