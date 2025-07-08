// Import libraries
import clsx from 'clsx';

// Import styles
import * as styles from './Home.module.scss';

// Import components
import Post from '~/components/Post/Post';
import Filter from '~/components/Filter/Filter';

function Home() {
    return (
        <div className={clsx(styles.Home)}>
            <div className="Filter">
                <Filter />
            </div>
            <div className="Feed">
                <h1>Feed</h1>
                <Post />
                <Post />
                <Post />
            </div>
            <div className="Contact">
                <h1>Contact</h1>
            </div>
        </div>
    );
}

export default Home;
