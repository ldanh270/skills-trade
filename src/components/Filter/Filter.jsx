import { memo } from 'react'

import styles from './Filter.module.scss'
import PointRangeInput from './PointRangeInput/PointRangeInput'
// Import filter input components
import PostTypeInput from './PostTypeInput/PostTypeInput'
import RatingInput from './RatingInput/RatingInput'
import SkillInput from './SkillInput/SkillInput'

/**
 * Filter Component
 * Displays a list of filtering options for posts
 */
function Filter({ filters, setFilters }) {
    return (
        <div className={styles['Filter']}>
            <h2 className={styles['title']}>Filters</h2>

            {/* Post Type (Hire / Offer) */}
            <PostTypeInput filters={filters} setFilters={setFilters} />

            {/* Skills (Select multiple skills) */}
            <SkillInput filters={filters} setFilters={setFilters} />

            {/* Rating (Minimum rating) */}
            <RatingInput filters={filters} setFilters={setFilters} />

            {/* Point Range (min - max budget) */}
            <PointRangeInput filters={filters} setFilters={setFilters} />
        </div>
    )
}

export default memo(Filter)
