import React from 'react'

import * as styles from './TagBadge.module.scss'

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
