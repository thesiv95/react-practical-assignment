import doAPIRequest from '../utils/doAPIRequest'


export const getByPage = async (pageNumber = 1) => {
  return doAPIRequest(`/post/page/${pageNumber}`);
}

export const getByQuery = async (keyWord) => {
   return doAPIRequest(`/post/search/${keyWord}`);
}

export const addNew = async (payload) => {
  return doAPIRequest('/post', 'post', payload);
}

export const uploadImage = async (payload) => {
  const {id, picture} = payload
  return doAPIRequest(`/post/${id}/picture`, 'post', picture);
}

export const edit = async (payload) => {
    const { id } = payload
    return doAPIRequest(`/post/${id}`, 'put', payload.body)
}

export const remove = async (payload) => {
    const { id } = payload
    return doAPIRequest(`/post/${id}`, 'delete', payload.body)
}