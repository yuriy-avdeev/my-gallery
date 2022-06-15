import { memo, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks'

import './Card.scss'
import { PaintingData } from '../../types/variables'

type CardProps = {
  painting: PaintingData,
  isPictureOpen: boolean
}


const Card: React.FC<CardProps> = memo(({ painting, isPictureOpen }) => {
  const { inputValue } = useAppSelector(state => state.paintings)
  const [parsedMsg, setParsedMsg] = useState<string[]>([])

  useEffect(() => {
    inputValue &&
      setParsedMsg(painting.title.split(new RegExp(`(${inputValue})`, 'gi')))
  }, [inputValue])

  console.log(parsedMsg)


  // v-for="(segment, i) in parsedMsg"
  // :class="{ highlight: segment.toLowerCase() === inputValue.toLowerCase() }"
  // :key="i"
  // {{ segment }}


  return (
    <div className={`card ${isPictureOpen && 'card__shift'}`}>
      <NavLink to={painting.cardId}>
        <img className='card__image' src={painting.link} alt={painting.title} />
      </NavLink>
      <h4 className='card__title'>
        {
          !inputValue
            ?
            painting.title
            :
            parsedMsg.map((segment, idx) =>
              <span
                key={idx}
                className={`${segment.toLowerCase() === inputValue.toLowerCase() && 'card__title_highlight'}`}
              >
                {segment}
              </span>
            )
        }
      </h4>
    </div >
  )
})

export default Card
