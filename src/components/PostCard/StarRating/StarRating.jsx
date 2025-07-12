import { Star } from 'lucide-react'
import React from 'react'

import * as styles from './StarRating.module.scss'

/**
 * StarRating Component
 * Displays 5 stars, filled based on the `value` prop.
 *
 * Props:
 * - value (Number): current rating (1–5)
 */
const StarRating = ({ value }) => {
    return (
        <div className={styles['stars']}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={20}
                    title={`Rated ${i}`}
                    className={
                        i <= value ? `${styles['star']} ${styles['filled']}` : styles['star']
                    }
                />
            ))}
        </div>
    )
}

export default StarRating
