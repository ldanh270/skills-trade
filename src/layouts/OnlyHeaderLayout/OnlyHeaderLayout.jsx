import * as styles from './OnlyHeaderLayout.module.scss'

function OnlyHeaderLayout({ children }) {
    return (
        <div className={styles['OnlyHeaderLayout']}>
            <div className={styles['Content']}>{children}</div>
        </div>
    )
}

export default OnlyHeaderLayout
