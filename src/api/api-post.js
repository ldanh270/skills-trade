import axios from 'axios'

import { BASE_URL } from '~/constants/globalConstants'

/**
 * Fetch all posts sorted by creation date (newest first).
 * @returns {Promise<Array>} List of newest posts
 */
export const fetchNewestPosts = async () => {
    const res = await axios.get(`${BASE_URL}/posts?_sort=createdAt&_order=desc`)
    return res.data
}

/**
 * Fetch "For You" posts sorted by rating (descending).
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of posts per page
 * @returns {Promise<Array>} List of recommended posts
 */
export const fetchForYouPosts = async (page = 1, limit = 10) => {
    const response = await axios.get(
        `${BASE_URL}/posts?_page=${page}&_limit=${limit}&_sort=rating&_order=desc`,
    )
    return response.data
}

/**
 * Fetch saved posts for a user by post IDs (with pagination).
 * @param {string} userId - ID of the user
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of posts per page
 * @returns {Promise<Array>} List of saved post objects
 */
export const fetchSavedPosts = async (userId, page = 1, limit = 10) => {
    try {
        // Step 1: Fetch user to get list of saved post IDs
        const userRes = await axios.get(`${BASE_URL}/users/${userId}`)
        const savedPostIds = userRes.data.savedPosts

        if (!savedPostIds || savedPostIds.length === 0) return []

        // Step 2: Apply pagination to saved post IDs
        const start = (page - 1) * limit
        const end = start + limit
        const paginatedIds = savedPostIds.slice(start, end)

        // Step 3: Fetch individual post details
        const postRequests = paginatedIds.map((id) => axios.get(`${BASE_URL}/posts/${id}`))
        const responses = await Promise.all(postRequests)

        return responses.map((res) => res.data)
    } catch (err) {
        console.error('Failed to fetch saved posts:', err)
        return []
    }
}

/**
 * Create a new post
 * @param {Object} postData - Data of the post to create
 * @returns {Promise<Object>} Created post data
 */

export const createPost = async (postData) => {
    try {
        const response = await axios.post(`${BASE_URL}/posts`, postData)
        return response.data
    } catch (error) {
        console.error('Error creating post:', error)
        throw error // Re-throw để xử lý tiếp ở component
    }
}
