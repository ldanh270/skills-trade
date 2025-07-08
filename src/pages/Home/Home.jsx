// Import libraries
import clsx from 'clsx';

// Import styles
import * as styles from './Home.module.scss';

// Import components
import Post from '~/components/Post/Post';

function Home() {
    return (
        <div className={clsx(styles.Home)}>
            <Post />
        </div>
    );
}

export default Home;
