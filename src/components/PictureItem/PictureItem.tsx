import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './PictureItem.scss'

import { PaintingData } from '../../types/variables'


import dali from '../../assets/images/mock/dali.jpg'
import endy from '../../assets/images/mock/endy.webp'
import monet from '../../assets/images/mock/monet.jpg'
import raffael from '../../assets/images/mock/raffael.jpg'
import rembrandt from '../../assets/images/mock/rembrandt.jpg'
import vanGog from '../../assets/images/mock/van-gog.jpg'
import sun from '../../assets/images/mock/sun.png'

const paintings: PaintingData[] = [ // потом добавить как для пропсов
  { name: 'Dali', link: dali, cardId: 'dali' },
  { name: 'Endy', link: endy, cardId: 'endy' },
  { name: 'Monet', link: monet, cardId: 'monet' },
  { name: 'Raffel', link: raffael, cardId: 'raffael' },
  { name: 'Rembrandt', link: rembrandt, cardId: 'rembrandt' },
  { name: 'VanGog', link: vanGog, cardId: 'van-gog' },
  { name: 'Sun', link: sun, cardId: 'sun' }
]

// надуманный пример - наследование интерфейса от (!) типа без новых данных
interface IPaintingData extends PaintingData { }

const PictureItem = () => {
  const { cardId } = useParams()
  const [card, setCard] = useState<IPaintingData>()

  useEffect(() => {
    setCard(paintings.find(c => c.cardId === cardId))
  }, [cardId])


  return (
    <>
      {card && <img className='picture-item__image' src={card.link} alt={`painting ${card.name}`} />}
    </>
  )
}

export default PictureItem
