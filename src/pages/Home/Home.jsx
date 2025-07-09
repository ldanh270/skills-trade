import Filter from '~/components/Filter/Filter'
import PostCard from '~/components/PostCard/PostCard'

import * as styles from './Home.module.scss'

const Home = () => {
    return (
        <div className={styles['Home']}>
            <div className="Filter">
                <Filter />
            </div>
            <div className="Feed">
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
            <div className="Contact">
                <h1>Contact</h1>
            </div>
        </div>
    )
}

export default Home
