import axios from 'axios'

import { BASE_URL } from '~/api/api-constants'

/**
 * Fetch all chat conversations from the server.
 * @returns {Promise<Array>} List of chat objects
 */
export const fetchChats = async () => {
    const res = await axios.get(`${BASE_URL}/chats`)
    return res.data
}

/**
 * Update messages of an existing chat.
 * @param {string} chatId - The ID of the chat to update
 * @param {Array} messages - Array of message objects to update in the chat
 * @returns {Promise<Object>} Updated chat object
 */
export const updateChatMessages = async (chatId, messages) => {
    const res = await axios.patch(`${BASE_URL}/chats/${chatId}`, {
        messages,
    })
    return res.data
}

/**
 * Create a new chat between participants with the first message.
 * @param {Array<string>} participants - Array of user IDs involved in the chat
 * @param {Object} message - The initial message object to start the conversation
 * @returns {Promise<Object>} Newly created chat object
 */
export const createChat = async (participants, message) => {
    const res = await axios.post(`${BASE_URL}/chats`, {
        participants,
        messages: [message],
    })
    return res.data
}
