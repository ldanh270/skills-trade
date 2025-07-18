import axios from 'axios'

import { BASE_URL } from './api-constants'

export const createPartnerRequest = async ({
    postId,
    applyUserId,
    postAuthorId,
    status = 'pending',
    createdAt,
}) => {
    const response = await axios.post(`${BASE_URL}/partnerRequests`, {
        postId: postId,
        from: applyUserId,
        to: postAuthorId,
        status,
        createdAt,
    })
    return response.data
}

export const fetchPartnerRequestStatus = async (postId, userId) => {
    // Tìm partner request mà from=userId và postId=postId
    const response = await axios.get(`${BASE_URL}/partnerRequests?from=${userId}&postId=${postId}`)
    if (response.data && response.data.length > 0) {
        return response.data[0]
    }
    return null
}

export const deletePartnerRequest = async (postId, userId) => {
    // Lấy partnerRequest đầu tiên matching from=userId, postId=postId
    const response = await axios.get(`${BASE_URL}/partnerRequests?from=${userId}&postId=${postId}`)
    if (response.data && response.data.length > 0) {
        const reqId = response.data[0].id
        await axios.delete(`${BASE_URL}/partnerRequests/${reqId}`)
        return true
    }
    return false
}
