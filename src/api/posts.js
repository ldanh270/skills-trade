import axios from 'axios'

const BASE_URL = `http://localhost:3001`

const fetchNewestPosts = async (page = 1, limit = 10) => {
    const response = await axios.get(
        `${BASE_URL}/posts?_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`,
    )
    return response.data
}

export default fetchNewestPosts
