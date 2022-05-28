import { useState, useRef, useEffect } from 'react'
import './PictureSearch.scss'


const PictureSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [isInputValid, setIsInputValid] = useState(true)

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  useEffect(() => {
    const regex = /^[a-zA-Z]*$/g
    setIsInputValid(regex.test(inputValue))
  }, [inputValue])


  const handleCgange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setInputValue(e.target.value)
    // тип - навести на элементе на onChange (работает для форм)
  }


  return (
    <div className='search'>
      <label className='search__label'>Searching</label>
      <input
        className='search__input'
        value={inputValue}
        onChange={handleCgange}
        ref={inputRef}
        placeholder='start typing here'
      />
      <span className='search__close' onClick={() => setInputValue('')}>+</span>
      {!isInputValid && <span className='search__warning'>field can only contain letters</span>}

    </div>
  )
}

export default PictureSearch
