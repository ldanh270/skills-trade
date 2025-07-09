import Header from '~/layouts/components/Header/Header'

import * as styles from './DefaultLayout.module.scss'

function DefaultLayout({ children }) {
    return (
        <div className={styles['DefaultLayout']}>
            <Header />
            <div className="container">
                <div className={styles['content']}>{children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout
