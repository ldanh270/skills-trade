import axios from 'axios'

import { BASE_URL } from '~/constants/globalConstants'

/**
 * Fetch the user data for the hardcoded user ID.
 *
 * @async
 * @function fetchUser
 * @returns {Promise<Object|null>} A promise that resolves to the user object,
 *                                 or null if the request fails.
 */
export const fetchUser = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/users/1a2b3c4d-5e6f-7a8b-9c0d-111213141516`)
        return res.data
    } catch (err) {
        console.error(err)
        return null
    }
}

/**
 * Update the user data for the given user ID.
 *
 * @async
 * @function updateUser
 * @param {string} userId - The ID of the user to update.
 * @param {Object} updatedData - The fields to update in the user object.
 * @returns {Promise<Object|undefined>} A promise that resolves to the updated user object,
 *                                      or undefined if the request fails.
 */
export const updateUser = async (userId, updatedData) => {
    console.log(userId)
    try {
        const res = await axios.patch(
            `${BASE_URL}/users/1a2b3c4d-5e6f-7a8b-9c0d-111213141516`,
            updatedData,
        )
        console.log(updatedData)
        return res.data
    } catch (err) {
        console.error('Failed to update user:', err)
    }
}
