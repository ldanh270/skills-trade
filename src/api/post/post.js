import axios from 'axios'

import { BASE_URL } from '~/constants/globalConstants'

const fetchNewestPosts = async (page = 1, limit = 10) => {
    const response = await axios.get(
        `${BASE_URL}/posts?_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`,
    )
    return response.data
}

// Example API call with AI
const fetchForYouPosts = async (page = 1, limit = 10) => {
    const response = await axios.get(
        `${BASE_URL}/posts?_page=${page}&_limit=${limit}&_sort=rating&_order=desc`,
    )
    return response.data
}

const fetchSavedPosts = async (page = 1, limit = 10) => {
    const userId = 123 // Example user ID

    const response = await axios.get(`http://localhost:3001/user/${userId}/savedPosts`, {
        params: {
            userId,
            _page: page,
            _limit: limit,
        },
    })
    return response.data
}

export { fetchForYouPosts, fetchNewestPosts, fetchSavedPosts }
