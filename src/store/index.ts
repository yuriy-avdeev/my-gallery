import { configureStore } from '@reduxjs/toolkit'
import paintingSlice from './paintingSlice'

const store = configureStore({ // создал стор
  reducer: {
    paintings: paintingSlice, // зарегистр. слайс в глоб. сторе
    // other: otherSlice, ...
  },
})

export default store

// чтобы не прописывать каждый раз типы при использовании хуков и создать кастомные хуки:
export type RootState = ReturnType<typeof store.getState> // => type RootState
export type AppDispatch = typeof store.dispatch
