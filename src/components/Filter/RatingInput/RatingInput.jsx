import { Star } from 'lucide-react'

import * as styles from './RatingInput.module.scss'

/**
 * RatingInput component
 * Allows user to select rating from 1 to 5 by clicking stars
 */
function RatingInput({ filters, setFilters }) {
    // Toggle star rating (reset to 0 if clicked again)
    const handleStarClick = (prev, value) => {
        setFilters({
            ...filters,
            rating: filters.rating === value ? 0 : value,
        })
    }

    return (
        <div className={styles['RatingInput']}>
            <label>Rating</label>
            <div className={styles['stars']}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                        key={i}
                        size={20}
                        onClick={(prev) => handleStarClick(prev, i)}
                        className={
                            filters.rating >= i
                                ? `${styles['star']} ${styles['filled']}`
                                : styles['star']
                        }
                        title={`Rated ${i}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default RatingInput
