import { ReactNode } from 'react'

export type CustomLinkListProps = {
  to: string
  children: ReactNode
}

export type PaintingData = {
  name: string
  link: string
  cardId: string
}



  // =========
  export type Cat = { breed: string; yearOfBirth: number }
  export interface Dog {
    breeds: string[]
    yearOfBirth: number
  }
  type Animals = Cat | Dog