import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IGif } from '../../interfaces'

export interface gifsState {
  value: IGif[]
}

const initialState: gifsState = {
  value: [],
}

export const gifsSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {
    setGifs: (state, action: PayloadAction<IGif[]>) => {
    state.value = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { setGifs } = gifsSlice.actions

export default gifsSlice.reducer