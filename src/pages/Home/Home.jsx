import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { fetchForYouPosts, fetchNewestPosts, fetchSavedPosts } from '~/api/posts'
import Filter from '~/components/Filter/Filter'
import PostCard from '~/components/PostCard/PostCard'

import FeedSelection from './FeedSelection/FeedSelection'
import * as styles from './Home.module.scss'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [feedType, setFeedType] = useState('newest')

    const fetchPostsByType = async (pageNum = 1) => {
        try {
            let newPosts = []
            if (feedType === 'newest') {
                newPosts = await fetchNewestPosts(pageNum)
            } else if (feedType === 'foryou') {
                newPosts = await fetchForYouPosts(pageNum)
            } else if (feedType === 'saved') {
                newPosts = await fetchSavedPosts(pageNum)
            }

            // Nếu hết dữ liệu (VD: < limit), tắt hasMore
            if (newPosts.length === 0) {
                setHasMore(false)
            }

            setPosts((prevPosts) => [...prevPosts, ...newPosts])
            setPage((prev) => prev + 1)
        } catch (err) {
            console.error('Cannot fetch. Error:', err)
        }
    }

    useEffect(() => {
        // Reset lại khi đổi feedType
        setPosts([])
        setPage(1)
        setHasMore(true)
        fetchPostsByType(1)
    }, [feedType])

    return (
        <div className={styles['Home']}>
            <div className={styles['Filter']}>
                <Filter />
            </div>
            <div className={styles['Feed']}>
                <FeedSelection feedType={feedType} setFeedType={setFeedType} />
                <InfiniteScroll
                    dataLength={posts.length}
                    next={() => fetchPostsByType(page)}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </InfiniteScroll>
            </div>
            <div className={styles['ChatAI']}>
                <h1>ChatAI</h1>
            </div>
        </div>
    )
}

export default Home
