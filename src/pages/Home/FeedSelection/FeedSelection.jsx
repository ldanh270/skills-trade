import styles from './FeedSelection.module.scss'

const FeedSelection = ({ feedType, setFeedType, setFilters }) => {
    // Define available tabs
    const tabs = [
        { key: 'newest', label: 'Newest' },
        { key: 'foryou', label: 'For you' },
        { key: 'saved', label: 'Saved posts' },
    ]

    // Handle tab click: set feed type and reset filters
    const handleSelect = (key) => {
        setFeedType(key)
        setFilters({
            type: null,
            skills: [],
            rating: null,
            pointMin: null,
            pointMax: null,
        })
    }

    return (
        <div className={styles['wrapper']}>
            {tabs.map((tab) => (
                <div
                    key={tab.key}
                    className={`${styles['tab']} ${feedType === tab.key ? styles['active'] : ''}`}
                    onClick={() => handleSelect(tab.key)}
                >
                    <div className={styles['label']}>{tab.label}</div>
                    {feedType === tab.key && <div className={styles['underline']} />}
                </div>
            ))}
        </div>
    )
}

export default FeedSelection
