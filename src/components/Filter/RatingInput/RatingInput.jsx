import { Star } from 'lucide-react'
import { useState } from 'react'

import * as styles from './RatingInput.module.scss'

function RatingInput() {
    const [rating, setRating] = useState(0)

    const handleStarClick = (value) => {
        setRating((prev) => (prev === value ? 0 : value))
    }

    return (
        <div className={styles['RatingInput']}>
            <label>Rating</label>
            <div className={styles['stars']}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                        key={i}
                        size={20}
                        onClick={() => handleStarClick(i)}
                        className={
                            rating >= i ? `${styles['star']} ${styles['filled']}` : styles['star']
                        }
                        title={`Rated ${i}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default RatingInput
