import * as styles from './PostTypeInput.module.scss'

/**
 * PostTypeInput component
 * Allows users to select the type of post: Offer or Hire
 */
function PostTypeInput({ filters, setFilters }) {
    return (
        <div className={styles['PostTypeInput']}>
            {/* Label for the input section */}
            <label>Type of post</label>

            {/* Render buttons for each post type */}
            <div className={styles['buttonGroup']}>
                {['Offer', 'Hire'].map((item) => (
                    <button
                        key={item}
                        onClick={() =>
                            setFilters({
                                ...filters,
                                // Toggle type: unselect if already selected, otherwise set new type
                                type: filters.type === item ? '' : item,
                            })
                        }
                        className={
                            filters.type === item
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
