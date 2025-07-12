import axios from 'axios'

import { BASE_URL } from '~/constants/globalConstants'

export const fetchUser = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/users/1a2b3c4d-5e6f-7a8b-9c0d-111213141516`)
        return res.data
    } catch (err) {
        console.error(err)
        return null
    }
}

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
