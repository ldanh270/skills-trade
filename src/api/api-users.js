import axios from 'axios'

import { BASE_URL } from './api-constants'

export const fetchUserById = async (userId) => {
    const res = await axios.get(`${BASE_URL}/users/${userId}`)
    return res.data
}
