import Header from '~/layouts/components/Header/Header'

import * as styles from './DefaultLayout.module.scss'

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className={styles['DefaultLayout']}>
            <div className="container">
                <div className={styles['content']}>{children}</div>
            </div>
        </div>
        </>
    )
}

export default DefaultLayout
