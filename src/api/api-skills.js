import axios from 'axios'

import { BASE_URL } from '~/constants/globalConstants'

export const fetchSkills = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/skills`)
        return response.data
    } catch (error) {
        console.error('Error fetching skills:', error)
        return []
    }
}
