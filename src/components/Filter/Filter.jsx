import { memo } from 'react'

import styles from './Filter.module.scss'
import PointRangeInput from './PointRangeInput/PointRangeInput'
import PostTypeInput from './PostTypeInput/PostTypeInput'
import RatingInput from './RatingInput/RatingInput'
import SkillInput from './SkillInput/SkillInput'
function Filter({ filters, setFilters }) {
    return (
        <div className={styles['Filter']}>
            <h2 className={styles['title']}>Filters</h2>

            <PostTypeInput filters={filters} setFilters={setFilters} />
            <SkillInput filters={filters} setFilters={setFilters} />
            <RatingInput filters={filters} setFilters={setFilters} />
            <PointRangeInput filters={filters} setFilters={setFilters} />
        </div>
    )
}

export default memo(Filter)
