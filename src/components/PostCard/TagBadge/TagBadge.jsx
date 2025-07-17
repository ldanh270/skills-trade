import React from 'react'

import * as styles from './TagBadge.module.scss'

/**
 * TagBadge component
 * Displays a badge based on the tag name:
 * - 'Offer' → yellow
 * - 'Hire' → green
 * - default → gray (used for skills)
 */
const TagBadge = ({ name }) => {
    return (
        <span
            className={`${styles['TagBadge']} ${
                name === 'Offer'
                    ? styles['badgeOffer']
                    : name === 'Hire'
                      ? styles['badgeHire']
                      : styles['badgeSkill']
            }`}
        >
            {name}
        </span>
    )
}

export default TagBadge
