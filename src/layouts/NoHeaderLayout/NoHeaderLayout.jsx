import * as styles from './NoHeaderLayout.module.scss'

function NoHeaderLayout({ children }) {
    return (
        <div className={styles['NoHeaderLayout']}>
            <Header />
            <div className={styles['Content']}>{children}</div>
        </div>
    )
}

export default NoHeaderLayout
