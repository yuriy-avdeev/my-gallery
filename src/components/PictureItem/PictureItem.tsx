import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import './PictureItem.scss'
import { PaintingData } from '../../types/variables'

import { useAppSelector, useAppDispatch } from '../../hooks' // <<<<<<<<<<<
import vanGog from '../../assets/images/mock/van-gog.jpg' // <<<<<<<<<<<
import { addPainting, deletePainting } from '../../store/paintingSlice' // <<<<<<<<<<<


// надуманный пример - наследование интерфейса от (!) типа без новых данных
interface IPaintingData extends PaintingData { }


const PictureItem = () => {
  const { cardId } = useParams()
  const dispatch = useAppDispatch() // <<<<<<<<<<<
  const { paintingsMainList } = useAppSelector(state => state.paintings)
  const [card, setCard] = useState<IPaintingData>()
  const [inputTitle, setInputTitle] = useState('')
  const [inputLink, setInputLink] = useState('')

  useEffect(() => {
    setCard(paintingsMainList.find(c => c.cardId === cardId))
    console.log(paintingsMainList)
  }, [cardId, paintingsMainList])


  // все работает - временно закомментировал
  const handleAdd: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault()
    dispatch(addPainting({ name: inputTitle, link: inputLink }))
  }

  // все работает - временно закомментировал
  const handleDelete = () => {
    if (cardId) dispatch(deletePainting(cardId))
  }

  return (
    <div className='picture-item'>
      <form className='picture-item__form' onSubmit={handleAdd}>
        <input
          className='picture-item__input'
          name='title'
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder='title'
        />

        <input
          className='picture-item__input'
          name='link'
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
          placeholder='link'
          type="file"
        />
        <button className='picture-item__btn_add'>SEND</button>
      </form>
      {card && <img className='picture-item__image' src={card.link} alt={`painting ${card.title}`} />}
      <button onClick={handleDelete} className='picture-item__btn_del'>DELETE</button>
    </div>
  )
}

export default PictureItem
