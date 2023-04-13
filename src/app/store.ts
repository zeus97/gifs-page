import { configureStore } from '@reduxjs/toolkit'

//Reducers
import gifsSlice from '../features/gifs/gifsSlice';

export const store = configureStore({
  reducer: {
    gifs: gifsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch