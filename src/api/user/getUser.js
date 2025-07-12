import axios from 'axios'

import { BASE_URL } from '~/constants/globalConstants'

export const fetchUser = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user`)
        return res.data //User data
    } catch (error) {
        console.error('Failed to fetch user:', error)
        return null
    }
}
