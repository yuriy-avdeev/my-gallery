import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit'
import { PaintingData, PaintingState, ActionString } from '../types/variables'
import { paintingsTempList } from './data'

interface IPaintingData extends PaintingData {
  id: number // т.к. cервер возвращает со "своим" id (ниже я его чищу перед добавлением карточки)
}

const initialState: PaintingState = {
  paintingsMainList: [],
  paintingsRenderList: [],
  inputValue: '',
  isLoading: false,
  error: null,
}

// принимает имя (принято как ниже) и асинх. ф-ю с 3-я (или 2-я парметарми)
// в дженерик 1 - что возвращаем, 2 - параметры (тут - _, т.е. ничего -> "p/s/ - переделал на number"), 3 - см. AsyncThunkConfig (откр. по ссылкам) - смысл в том, что нужно самому описать то что в AsyncThunkConfig - тут возвр. строку в rejectValue
export const fetchPaintings = createAsyncThunk<PaintingData[], number, { rejectValue: string }>(
  'paintings/fetchPaintings', // имя как в экшенах - но там создается под капотом
  // 1-й параметр - то, что передали из компонента при вызове ф-ии
  async function (number, { rejectWithValue }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${number}`)
    if (!res.ok) rejectWithValue('Server Error!!!')
    return await res.json() // - дальше экшен в одном из 3-х методов жизненного цикла (тут в extraReducers)
  }
)

export const addPainting = createAsyncThunk<IPaintingData, { name: string; link: string }, { rejectValue: string }>(
  'paintings/addPainting',
  async function ({ name, link }, { rejectWithValue }) {
    console.log(link) // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const painting = {
      title: name,
      link,
      cardId: name.toLowerCase(),
    }
    const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(painting),
    })
    if (!res.ok) rejectWithValue("Can't add painting. Server error.")
    return (await res.json()) as IPaintingData // add id => ???? - ниже id убираю перед добавлением
  }
)

export const deletePainting = createAsyncThunk<
  PaintingData,
  string,
  { rejectValue: string; state: { paintings: PaintingState } }
>('paintings/deletePainting', async function (cardId, { rejectWithValue, getState }) {
  // getState - получить к.-л. данные из стейта - для этого выше описываем чтo такое state
  const card = getState().paintings.paintingsMainList.find((c) => c.cardId === cardId)
  if (card) {
    // без этой проверки TS давал ошибку - думал, что card м.б. undefined т.е. не найдена
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`, {
      method: 'DELETE', // если меняем данные - в тело запроса новую карточку
    })
    if (!res.ok) rejectWithValue('Server Error! Delete faild!')
    // dispatch(removePainting({id})) // удаляем локально (моковый вызов) <- подход без TS
    return card // можно не искать выше карточку, а просто вернуть id - но оставил, чтобы показать доступ к стейту
  }
  return rejectWithValue('No such painting!')
})

// ===========================================================================================

// без ts ->
// const setError = (state, action) => {
//   // проверить - передаю внизу без вызова и параметров как и в видео
//   state.error = action.payload
//   state.isLoading = false
// }

// ============================================================================================

const paintingSlice = createSlice({
  name: 'paintings',
  initialState,
  reducers: {
    // набор методов для дальнейшего использования
    // после добавления асинх. кода логика ушла в экстраредюсеры
    searchPainting(state, action: PayloadAction<ActionString>) {
      state.inputValue = action.payload.inputValue
      state.paintingsRenderList = state.paintingsMainList.filter((c) =>
        c.title.toLowerCase().includes(action.payload.inputValue.toLowerCase())
      )
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPaintings.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPaintings.fulfilled, (state, action) => {
        state.paintingsMainList = action.payload.map((card, idx) => {
          // mock - тут данные от JsonPlaceHolder не используется - он нужен только для имитации работы с сервером
          return {
            title: paintingsTempList[idx].title,
            link: paintingsTempList[idx].link,
            cardId: paintingsTempList[idx].cardId,
          }
        })
        state.paintingsRenderList = state.paintingsMainList
        state.isLoading = false
      })

      .addCase(addPainting.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addPainting.fulfilled, (state, action) => {
        const { title, link, cardId } = { ...action.payload }
        state.paintingsMainList.push({ title, link, cardId })
        state.isLoading = false
      })

      .addCase(deletePainting.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deletePainting.fulfilled, (state, action) => {
        state.paintingsMainList = state.paintingsMainList.filter((c) => c.cardId !== action.payload.cardId)
        state.isLoading = false
      })

      // обработка ошибок - тут описание, ниже ф-я которая тут на входе
      // action тут нужно описать - тут получаю строку см. выше - { rejectValue: string }
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.isLoading = false
      })
  },

  //   // нужен для отработки асинхр. кода (тут фетч) - ниже 1 из вариантов обработки кода - но этот подход если нет ts, если в проекте ts - рекомендованный подход использовать builder (выше)
  //   extraReducers: {
  //     [fetchPaintings.pending]: (state) => {
  //       // динамический ключ
  //       state.isLoading = true
  //       state.error = null // если была раньше
  //     },
  //     [fetchPaintings.fulfilled]: (state, action) => {
  //       state.paintingsMainList = action.payload.map((c) => ...) // логику для слияния со своими данными
  //       state.isLoading = false
  //     },
  //     [fetchPaintings.rejected]: setError,
  //     [deletePainting.rejected]: setError,
  //   },
})

// ловим ошибку; тип AnyAction - из библиотеки
function isError(action: AnyAction) {
  return action.type.endsWith('rejected') // boolean
}

// наружу из paintingSlice.actions - если использовать только локально для асинхронных операций, то экспорт убрать!!!
export const { searchPainting } = paintingSlice.actions
export default paintingSlice.reducer // подключить к стору в index.ts
