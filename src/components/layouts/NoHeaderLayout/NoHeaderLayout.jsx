// Import styles
import * as styles from './OnlyHeaderLayout.module.scss';

// Import components
import Header from '~/components/layouts/components/Header/Header';

function OnlyHeaderLayout({ children }) {
    return (
        <div className="OnlyHeaderLayout">
            <Header />
            <div className={styles['Content']}>{children}</div>
        </div>
    );
}

export default OnlyHeaderLayout;
