import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render, screen, getByText } from '@testing-library/react'
// import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

import paintingSlice from '../../store/paintingSlice'
import App from './App'


const renderWithRedax = (
  component: JSX.Element,
  store = configureStore({
    reducer: { paintings: paintingSlice },
  }),
) => {
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </Provider>),
    store
  }
}

describe('App test', () => {
  test('check test', () => {
    renderWithRedax(<App />)
    expect(screen.getByText('Oksana Avdeeva')).toBeInTheDocument()
  })
})