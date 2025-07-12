import axios from 'axios'

import { BASE_URL } from '~/constants/globalConstants'

export const fetchChats = async () => {
    const res = await axios.get(`${BASE_URL}/chats`)
    return res.data
}

export const updateChatMessages = async (chatId, messages) => {
    const res = await axios.patch(`${BASE_URL}/chats/${chatId}`, {
        messages,
    })
    return res.data
}

export const createChat = async (participants, message) => {
    const res = await axios.post(`${BASE_URL}/chats`, {
        participants,
        messages: [message],
    })
    return res.data
}
