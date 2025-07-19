import axios from 'axios'

import { BASE_URL } from '~/api/api-constants'

/**
 * Login user with email/username and password
 *
 * @async
 * @function loginUser
 * @param {string} email - User's email or username
 * @param {string} password - User's password
 * @returns {Promise<Object|null>} A promise that resolves to the user object if login successful,
 *                                 or null if login fails
 */
export const loginUser = async (email, password) => {
    try {
        // Get all users to find matching credentials
        const res = await axios.get(`${BASE_URL}/users`)
        const users = res.data

        // First check if user exists
        const userExists = users.find((u) => u.email === email || u.username === email)

        if (!userExists) {
            throw new Error('User not found')
        }

        // Then check password
        const user = users.find(
            (u) => (u.email === email || u.username === email) && u.password === password,
        )

        if (user) {
            return user
        } else {
            throw new Error('Invalid credentials')
        }
    } catch (err) {
        console.error('Login failed:', err)
        throw err // Re-throw the error to handle it in the component
    }
}

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
