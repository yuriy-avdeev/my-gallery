import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import './Card.scss'
import { PaintingData } from '../../types/variables'


const Card: React.FC<{ painting: PaintingData }> = memo(({ painting }) => {
  return (
    <div className='card'>
      <h4 className='card__title'>{painting.name}</h4>
      <NavLink to={painting.cardId}>
        <img className='card__image' src={painting.link} alt={painting.name} />
      </NavLink>
    </div >
  )
})

export default Card
