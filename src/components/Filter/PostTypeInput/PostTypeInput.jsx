import * as styles from './PostTypeInput.module.scss'

/**
 * PostTypeInput component
 * Cho phép người dùng chọn loại bài viết: Offer hoặc Hire
 */
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
                                // Nếu đã chọn thì bỏ chọn, ngược lại gán type mới
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
