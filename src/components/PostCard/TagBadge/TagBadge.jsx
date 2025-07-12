import React from 'react'

import * as styles from './TagBadge.module.scss'

const TagBadge = ({ text }) => {
    return (
        <span
            className={`${styles['TagBadge']} ${
                text === 'Offer'
                    ? styles['badgeOffer']
                    : text === 'Hire'
                      ? styles['badgeHire']
                      : styles['badgeSkill']
            }`}
        >
            {text}
        </span>
    )
}

export default TagBadge
