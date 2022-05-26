import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './PictureItem.scss'

import { PaintingData } from '../../types/variables'


import sun from '../../assets/images/mock/u.png'
import book from '../../assets/images/mock/b.png'
import edit from '../../assets/images/mock/e.png'
import recycle from '../../assets/images/mock/s.png'
import basket from '../../assets/images/mock/m.svg'
const paintings = [
  { name: 'sun', link: sun, cardId: 'sun' },
  { name: 'book', link: book, cardId: 'book' },
  { name: 'edit', link: edit, cardId: 'edit' },
  { name: 'recycle', link: recycle, cardId: 'recycle' },
  { name: 'basket', link: basket, cardId: 'basket' }
]

// надуманный пример - наследование интерфейса от (!) типа без новых данных
interface IPaintingData extends PaintingData{} 

const PictureItem = () => {
  const { cardId } = useParams()
  const [card, setCard] = useState<IPaintingData>()

  useEffect(() => {
    setCard(paintings.find(c => c.name === cardId))
  }, [cardId])


  return (
    <div className='picture-item'>
      {card && <img className='picture-item__image' src={card.link} alt="painting" />}
    </div>
  )
}

export default PictureItem
