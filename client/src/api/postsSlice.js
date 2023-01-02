import { createSlice } from '@reduxjs/toolkit'
import doAPIRequest from '../utils/doAPIRequest'

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    value: [],
  },
  reducers: {
    getByPage: (state, payload) => {
      const { pageNumber = 1 } = payload
      doAPIRequest(`/post/page/${pageNumber}`).then((data) => {
        state.posts.value = data
        console.log('getByPage', state.posts.value)
      })
    },
    getByQuery: (state, payload) => {
        const { keyWord } = payload
        doAPIRequest(`/post/search/${keyWord}`).then((data) => state.posts.value = data)
    },
    addNew: (state, payload) => {
      doAPIRequest('/post', 'post', payload.body).then((data) => state.posts.value.push(data))
    },
    uploadImage: (state, payload) => {

    },
    edit: (state, payload) => {
        const { id } = payload
        doAPIRequest(`/post/${id}`, 'put', payload.body).then(
            (data) => {
               const newArray = state.posts.value.map(element => {
                    if (element.id === state.posts.value.id) {
                      return data
                    }
                    return element
                });
                state.posts.value = newArray
            }
        )
    },
    remove: (state, payload) => {
        const { id } = payload
        doAPIRequest(`/post/${id}`, 'delete', payload.body).then(
            (_data) => {
                const newArray = state.posts.value.filter((element) => {
                    return element.id !== state.posts.value.id
                })
                state.value = newArray
            }
        )
    },
  },
})

// Action creators are generated for each case reducer function
export const { getByPage, addNew, edit, remove, removeAll } = postsSlice.actions

export default postsSlice.reducer