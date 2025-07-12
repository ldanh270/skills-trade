import axios from 'axios'

import { BASE_URL } from '~/constants/globalConstants'

const updateReaction = async ({ postId, userId, reaction }) => {
    try {
        const res = await axios.post(`${BASE_URL}/reactions`, {
            postId,
            userId,
            reaction, // 'LIKE', 'DISLIKE', 'BOOKMARK', or 'REMOVE'
        })
        return res.data
    } catch (err) {
        console.error('Error updating reaction:', err)
    }
}

export { updateReaction }
