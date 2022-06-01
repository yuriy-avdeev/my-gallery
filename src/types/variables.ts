import { ReactNode } from 'react'

export type CustomLinkListProps = {
  to: string
  children: ReactNode
}

export type PaintingData = {
  title: string
  link: string
  cardId: string
  // completed: boolean // временно для работы с JsonPlaceHolder
  // id: number // временно для работы с JsonPlaceHolder
  // userId: number // временно для работы с JsonPlaceHolder
}

export type PaintingState = {
  paintingsMainList: PaintingData[]
  paintingsRenderList: PaintingData[]
  isLoading: boolean
  error: string | null
}

export type ActionString = {
  inputValue: string
}


// =========
export type Cat = { breed: string; yearOfBirth: number }
export interface Dog {
  breeds: string[]
  yearOfBirth: number
}
type Animals = Cat | Dog
