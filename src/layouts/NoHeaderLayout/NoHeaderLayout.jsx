import styles from './NoHeaderLayout.module.scss'

const NoHeaderLayout = ({children}) => {

    return (
        <div className="NoHeaderLayout">
            <div className="container">
                <div className={styles['content']}>{children}</div>
            </div>
        </div>
    )
}
export default NoHeaderLayout