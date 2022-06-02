import { useState, memo } from 'react'

import './Form.scss'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { addPainting, deletePainting } from '../../store/paintingSlice'


const Form: React.FC<{ cardId: string | undefined }> = memo(({ cardId }) => {
  const dispatch = useAppDispatch()
  const [inputTitle, setInputTitle] = useState('')
  const [inputLink, setInputLink] = useState('')
  // useSelector - доступ к данным стора (приним. стейт и ф-ю и возвр. тут в переменную)
  const { isLoading, error } = useAppSelector(state => state.paintings)

  // добавление через форму отсюда не работает - только через стор (добавлять в массив paintingsTempList)
  const handleAdd: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault()
    dispatch(addPainting({ name: inputTitle, link: inputLink }))
  }

  const handleDelete = () => {
    if (cardId) dispatch(deletePainting(cardId))
  }

  return (
    <>
      {error && <h2>Error - {error}</h2>}
      {isLoading && <h2>LOADING...</h2>}
      <form className='form' onSubmit={handleAdd}>
        <input
          className='form__input'
          name='title'
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder='title'
        />
        <input
          className='form__input'
          name='link'
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
          placeholder='link'
          type="file"
        />
        <button className='form__btn_add'>SEND</button>
        <button onClick={handleDelete} className='form__btn_del'>DELETE</button>
      </form>
    </>
  )
})

export default Form
