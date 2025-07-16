import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'

import { fetchForYouPosts, fetchNewestPosts, fetchSavedPosts } from '~/api/api-post'
import Filter from '~/components/Filter/Filter'
import PostCard from '~/components/PostCard/PostCard'

import ContactsList from '../../components/ContactList/ContactList'
import ChatBox from './ChatBox/ChatBox'
import FeedSelection from './FeedSelection/FeedSelection'
import styles from './Home.module.scss'

const Home = () => {
    // ----- FILTER STATE -----
    const [filters, setFilters] = useState({
        type: null,
        skills: [],
        rating: null,
        pointMin: null,
        pointMax: null,
    })

    // ----- FEED STATE -----
    const LOAD_LIMIT = 10
    const user = useSelector((state) => state.user.user)

    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [feedType, setFeedType] = useState('newest')

    const applyClientFilters = (posts, filters) => {
        return posts.filter((post) => {
            if (filters.type && post.type !== filters.type) return false
            if (filters.rating !== null && post.rating < filters.rating) return false
            if (filters.pointMin !== null && post.price?.min < filters.pointMin) return false
            if (filters.pointMax !== null && post.price?.max > filters.pointMax) return false
            if (filters.skills.length > 0) {
                const selectedSkills = filters.skills.map((s) => s.value)
                if (!selectedSkills.every((s) => post.skills.includes(s))) return false
            }
            return true
        })
    }

    const fetchPostsByType = async (pageNum = 1, limit = LOAD_LIMIT) => {
        try {
            let fetched = []

            if (feedType === 'newest') {
                fetched = await fetchNewestPosts(pageNum, limit)
            } else if (feedType === 'foryou') {
                fetched = await fetchForYouPosts(pageNum)
            } else if (feedType === 'saved') {
                fetched = await fetchSavedPosts(user.id, pageNum)
            }

            const filtered = applyClientFilters(fetched, filters)
            if (filtered.length < limit) setHasMore(false)

            setPosts((prev) => [...prev, ...filtered])
            setPage((prev) => prev + 1)
        } catch (err) {
            console.error('Cannot fetch. Error:', err)
        }
    }

    useEffect(() => {
        setPosts([])
        setPage(1)
        setHasMore(true)
        fetchPostsByType(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, feedType])

    // ----- CHAT STATE -----
    const [openChats, setOpenChats] = useState([])

    const handleOpenChat = (user) => {
        setOpenChats((prev) => (prev.find((u) => u.id === user.id) ? prev : [...prev, user]))
    }

    const handleCloseChat = (userId) => {
        setOpenChats((prev) => prev.filter((u) => u.id !== userId))
    }

    return (
        <div className={styles['Home']}>
            <div className={styles['Filter']}>
                <Filter filters={filters} setFilters={setFilters} />
            </div>

            <div className={styles['Feed']}>
                <div className={styles['curtain']}>
                    <div className={styles['FeedSelection']}>
                        <FeedSelection
                            feedType={feedType}
                            setFeedType={setFeedType}
                            setFilters={setFilters}
                        />
                    </div>
                </div>

                <div className={styles['infinity-scroll']}>
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={() => fetchPostsByType(page)}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                    >
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </InfiniteScroll>
                </div>
            </div>

            <div className={styles['Contacts']}>
                <ContactsList user={user} onSelect={handleOpenChat} />
            </div>

            <div className={styles['ChatboxContainer']}>
                {openChats.map((user) => (
                    <ChatBox
                        key={user.id}
                        contact={user}
                        onClose={() => handleCloseChat(user.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home
