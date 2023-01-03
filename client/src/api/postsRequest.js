import doAPIRequest from '../utils/doAPIRequest'

export const getByPage = async (pageNumber = 1) => {
  return doAPIRequest(`/post/page/${pageNumber}`)
}

export const getByQuery = async (keyWord) => {
   return doAPIRequest(`/post/search/${keyWord}`)
}

export const addNew = async (payload) => {
  return doAPIRequest('/post', 'post', payload)
}

export const uploadImage = async (payload) => {
  const {id, picture} = payload
  return doAPIRequest(`/post/${id}/picture`, 'post', picture)
}

export const edit = async (postId, body) => {
    return doAPIRequest(`/post/${postId}`, 'put', body)
}

export const remove = async (postId) => {
    return doAPIRequest(`/post/${postId}`, 'delete')
}