import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import './PictureItem.scss'
import Form from '../Form/Form'
import { PaintingData } from '../../types/variables'
import { useAppSelector } from '../../hooks'


// надуманный пример - наследование интерфейса от (!) типа без новых данных
interface IPaintingData extends PaintingData { }

const PictureItem: React.FC = () => {
  // вариант ниже -> проблема при вводе вручную любых данных в поле => переход на страницу карточки по GET-запросу
  // или setCard(paintingsMainList.find ниже в useEffect -> если не найдено - 404-ю страницу
  const { cardId } = useParams()
  const { paintingsMainList } = useAppSelector(state => state.paintings)
  const [card, setCard] = useState<IPaintingData>()
  const navigate = useNavigate()

  useEffect(() => {
    const currentCard = paintingsMainList.find(c => c.cardId === cardId)
    currentCard ?
      setCard(currentCard)
      :
      navigate('/not-found')
  }, [cardId, navigate, paintingsMainList])

  return (
    <>
      {card &&
        <>
          <img className='picture-item__image' src={card.link} alt={`painting ${card.title}`} />
          <h3 className='picture-item__title'>{card.title}</h3>
          <p className='picture-item__text'>2019. According to The New Yorker magazine, this is one of the most significant paintings of the first half of the 21st century, at the same time it is one of my favorite paintings that evokes warm memories.</p>
        </>
      }

      {/* форма для добавления и удаления картин */}
      {/* <Form cardId={cardId} /> */}
    </>
  )
}

export default PictureItem
