import axios from 'axios'

import { BASE_URL } from '~/constants/globalConstants'

/**
 * Fetch the list of available skills from the server.
 *
 * @async
 * @function fetchSkills
 * @returns {Promise<Array>} A promise that resolves to an array of skill objects.
 *                           Returns an empty array if the request fails.
 */
export const fetchSkills = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/skills`)
        return response.data
    } catch (error) {
        console.error('Error fetching skills:', error)
        return []
    }
}
