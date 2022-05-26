import { useState, useRef, useEffect } from 'react'
import './PictureSearch.scss'


const PictureSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  const handleCgange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    // тип - навести на элементе на onChange (работает для форм)
    setInputValue(e.target.value)
  }

  
  return (
    <div className='search'>
      <label className='search__label'>start typing the name of the picture</label>
      <input
        className='search__input'
        value={inputValue}
        onChange={handleCgange}
        ref={inputRef}
      />
      <span className='search__warning'>field can only contain letters</span>
    </div>
  )
}

export default PictureSearch
