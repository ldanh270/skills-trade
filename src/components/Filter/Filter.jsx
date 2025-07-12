import { memo } from 'react'

import styles from './Filter.module.scss'
import PointRangeInput from './PointRangeInput/PointRangeInput'
import PostTypeInput from './PostTypeInput/PostTypeInput'
import RatingInput from './RatingInput/RatingInput'
import FilterSkills from './SkillInput/SkillInput'
function Filter() {
    return (
        <div className={styles['Filter']}>
            <h2 className={styles['title']}>Filters</h2>

            <PostTypeInput />
            <FilterSkills />
            <RatingInput />
            <PointRangeInput />
        </div>
    )
}

export default memo(Filter)
