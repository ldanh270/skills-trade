import { useState } from 'react'

import * as styles from './PostTypeInput.module.scss'

function PostTypeInput() {
    // State to display type of post
    const [type, setType] = useState('Order')

    return (
        <div className={styles['PostTypeInput']}>
            <label>Type of post</label>

            <div className={styles['buttonGroup']}>
                {['Order', 'Hire'].map((item) => (
                    <button
                        key={item}
                        onClick={() => setType(item)}
                        className={
                            type === item
                                ? `${styles['button']} ${styles['active']}`
                                : styles['button']
                        }
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default PostTypeInput
