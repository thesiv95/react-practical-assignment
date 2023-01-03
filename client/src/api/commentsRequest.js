import doAPIRequest from "../utils/doAPIRequest"

export const create = async (text, postId, username) => {
    return doAPIRequest('/comment', 'post', { text, postId, username });
}

export const update = async (id, text, likes, dislikes) => {
    // If no text passed, it should not be touched
    const payload = text ? { text, likes, dislikes } : { likes, dislikes }
    return doAPIRequest(`/comment/${id}`, 'put', payload);
}

export const remove = async (id) => {
    try {
        const response = await doAPIRequest(`/comment/${id}`, 'delete');
       if (response.status === 400) return; // it means comment did not exist so prevent error
    } catch (error) {
        if (error.response.status === 400) return;
    }
}

