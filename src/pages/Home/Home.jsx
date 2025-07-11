import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import fetchNewestPosts from '~/api/posts'
import Filter from '~/components/Filter/Filter'
import PostCard from '~/components/PostCard/PostCard'

import FeedSelection from './FeedSelection/FeedSelection'
import * as styles from './Home.module.scss'

const Home = () => {
    // Lazy loading
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    useEffect(() => {
        const loadPosts = async () => {
            try {
                const newPosts = await fetchPosts(page)
                setPosts((prevPosts) => [...prevPosts, ...newPosts])
                setPage((prev) => prev + 1)
            } catch (err) {
                console.error('Cannot fetch. Error:', err)
            }
        }
        loadPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={styles['Home']}>
            <div className={styles['Filter']}>
                <Filter />
            </div>
            <div className={styles['Feed']}>
                <FeedSelection />
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchNewestPosts}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    {posts.map((post, index) => {
                        return <PostCard key={index} post={post} />
                    })}
                </InfiniteScroll>
            </div>
            <div className={styles['ChatAI']}>
                <h1>ChatAI</h1>
            </div>
        </div>
    )
}

export default Home
