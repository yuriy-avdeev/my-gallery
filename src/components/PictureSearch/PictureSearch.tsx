import { useState, useRef, useEffect } from 'react'
import { useAppDispatch } from '../../hooks'
import './PictureSearch.scss'
import { searchPainting } from '../../store/paintingSlice'


const PictureSearch: React.FC = () => {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [isInputValid, setIsInputValid] = useState(true)

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  useEffect(() => {
    // ф-я dispatch принимает событие и данные
    isInputValid && dispatch(searchPainting({ inputValue })) // в action только 1 параметр => объектом
  }, [inputValue])


  const handleCgange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    const regex = /^[a-zA-Z]*$/g
    setIsInputValid(regex.test(e.target.value))
    setInputValue(e.target.value)
  }

  
  return (
    <div className='search'>
      <input
        className={`search__input ${!isInputValid && 'search__input_warning'}`}
        value={inputValue}
        onChange={handleCgange}
        ref={inputRef}
        placeholder='Searching - start typing here'
      />
      <span
        className={`search__close ${!isInputValid && 'search__close_warning'}`}
        onClick={() => setInputValue('')}>
        +
      </span>
      {!isInputValid && <span className='search__warning'>field can only contain letters</span>}
    </div>
  )
}

export default PictureSearch
