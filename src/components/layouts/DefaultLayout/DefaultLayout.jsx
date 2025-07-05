// Import styles
import * as styles from './DefaultLayout.module.scss';

// Import components
import Header from '~/components/layouts/components/Header/Header';
import Sidebar from '~/components/layouts/components/Sidebar/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className={styles['DefaultLayout']}>
            <Header />
            <div className="container">
                <Sidebar />
                <div className={styles['content']}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
