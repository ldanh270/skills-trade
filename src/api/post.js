import axios from 'axios'

import { BASE_URL } from '~/constants/globalConstants'

const fetchNewestPosts = async (page = 1, limit = 10, filters = {}) => {
    let query = `_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`

    if (filters.type) query += `&type=${filters.type}`
    if (filters.rating) query += `&rating_gte=${filters.rating}`
    if (filters.pointMin) query += `&price_gte=${filters.pointMin}`
    if (filters.pointMax) query += `&price_lte=${filters.pointMax}`

    const res = await axios.get(`${BASE_URL}/posts?${query}`)
    let data = res.data

    if (filters.skills?.length > 0) {
        data = data.filter((post) => filters.skills.every((s) => post.skills.includes(s)))
    }

    return data
}

// Example API call with AI
const fetchForYouPosts = async (page = 1, limit = 10) => {
    const response = await axios.get(
        `${BASE_URL}/posts?_page=${page}&_limit=${limit}&_sort=rating&_order=desc`,
    )
    return response.data
}

const fetchSavedPosts = async (userId, page = 1, limit = 10) => {
    try {
        // Bước 1: Lấy danh sách postId đã lưu từ user
        const userRes = await axios.get(`http://localhost:3001/users/${userId}`)
        const savedPostIds = userRes.data.savedPosts

        if (!savedPostIds || savedPostIds.length === 0) return []

        // Bước 2: Lọc theo limit + page
        const start = (page - 1) * limit
        const end = start + limit
        const paginatedIds = savedPostIds.slice(start, end)

        // Bước 3: Lấy thông tin post theo từng id
        const postRequests = paginatedIds.map((id) =>
            axios.get(`http://localhost:3001/posts/${id}`),
        )
        const responses = await Promise.all(postRequests)

        return responses.map((res) => res.data)
    } catch (err) {
        console.error('Failed to fetch saved posts:', err)
        return []
    }
}

export { fetchForYouPosts, fetchNewestPosts, fetchSavedPosts }
