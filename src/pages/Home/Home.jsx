import Filter from '~/components/Filter/Filter'
import Post from '~/components/Post/Post'

import * as styles from './Home.module.scss'

function Home() {
    return (
        <div className={styles['Home']}>
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
    )
}

export default Home
