import { configureStore } from '@reduxjs/toolkit'
import postsSliceReducer from './postsSlice'

export default configureStore({
  reducer: {
    posts: postsSliceReducer,
  },
})