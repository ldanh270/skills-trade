import * as styles from './PostTypeInput.module.scss'

function PostTypeInput({ filters, setFilters }) {
    return (
        <div className={styles['PostTypeInput']}>
            <label>Type of post</label>

            <div className={styles['buttonGroup']}>
                {['Offer', 'Hire'].map((item) => (
                    <button
                        key={item}
                        onClick={() =>
                            setFilters({
                                ...filters,
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
