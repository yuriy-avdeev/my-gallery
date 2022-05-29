import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import dali from '../assets/images/mock/dali.jpg'
import endy from '../assets/images/mock/endy.webp'
import monet from '../assets/images/mock/monet.jpg'
import raffael from '../assets/images/mock/raffael.jpg'
import rembrandt from '../assets/images/mock/rembrandt.jpg'
import vanGog from '../assets/images/mock/van-gog.jpg'
import sun from '../assets/images/mock/sun.png'

// принимает имя (принято как ниже) и асинх. ф-ю с 3-я (или 2-я парметарми)
export const fetchPaintings = createAsyncThunk(
  'paintings/fetchPaintings', // имя как в экшенах - но там создается под капотом
  async function (_, { rejectWithValue }) {
    // 1-й параметр - то, что передали из компонента при вызове ф-ии
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      if (!res.ok) throw new Error('Server Error!!!')
      return await res.json() // - дальше экшен в одном из 3-х методов жизненного цикла (тут в extraReducers)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// пока нигде в компонентах не вызывается
export const deletePainting = createAsyncThunk(
  'paintings/deletePainting',
  async function (id, { rejectWithValue, dispatch, getState }) {
    // getState - получить к.-л. данные из стейта (путь длинный - в видео getState().todos.todos...)
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error("Can't delete!!!")
      // dispatch(removePainting({id})) // удаляем локально (моковый вызов)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const addPainting = createAsyncThunk(
  'paintings/addNewTodo',
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      }

      const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })

      if (!res.ok) throw new Error("Can't add task. Server error.")
      const data = await res.json()
      // dispatch(addTodo(data))
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

const setError = (state, action) => {
  // проверить - передаю внизу без вызова и параметров как и в видео
  state.error = action.payload
  state.isLoading = false
}

const paintingSlice = createSlice({
  name: 'paintings',
  initialState: {
    paintingsMainList: [
      { name: 'Dali', link: dali, cardId: 'dali' },
      { name: 'Monet', link: monet, cardId: 'monet' },
      { name: 'Raffael', link: raffael, cardId: 'raffael' },
      { name: 'VanGog', link: vanGog, cardId: 'van-gog' },
      { name: 'Rembrandt', link: rembrandt, cardId: 'rembrandt' },
      { name: 'Sun', link: sun, cardId: 'sun' },
      { name: 'Endy', link: endy, cardId: 'endy' },
    ],
    paintingsRenderList: [],
    isLoading: false,
    error: null,
  },

  reducers: {
    // набор методов для дальнейшего использования
    searchPainting(state, action) {
      console.log(action)
      state.paintingsMainList = state.paintingsMainList.filter((c) =>
        c.name.toLowerCase().includes(action.payload.inputValue.toLowerCase())
      )
      // console.log(action); // type: "paintings/searchPainting" - создается под капотом тулкитом
    },
  },

  // нужен для отработки асинхр. кода (тут фетч) - ниже 1 из вариантов обработки кода
  extraReducers: {
    [fetchPaintings.pending]: (state) => {
      // динамический ключ
      state.isLoading = true
      state.error = null // если была раньше
    },

    [fetchPaintings.fulfilled]: (state, action) => {
      state.paintingsMainList = action.payload.map((c) => c) // логику для слияния со своими данными
      state.isLoading = false
    },

    [fetchPaintings.rejected]: setError,
    [deletePainting.rejected]: setError,
  },
})

export const { searchPainting } = paintingSlice.actions // наружу из paintingSlice.actions - если использовать только локально для асинхронных операций, то экспорт убрать!!!
export default paintingSlice.reducer // подключить к стору в index.ts
