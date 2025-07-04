export type Book = {
  id: string
  branch: {
    id: number
    name: string
    steps: string
    currency: string
    ordering: string
    public: boolean
    pricelist: string
    cart: boolean
    content: string
  }
  added: number
  title: string
  shortDescription: string
  author: {
    id: number
    firstname: string
    surname: string
  }
  genre: {
    id: number
    name: string
    branch: {
      id: number
      name: string
      steps: string
      currency: string
      ordering: string
      public: boolean
      pricelist: string
      cart: boolean
      content: string
    }
    books: number
  }
  price: number
  sold: boolean
  soldOn: number | null
  removed: boolean
  removedOn: number | null
  reserved: boolean
  reservedAt: number | null
  releaseYear: number
  condition: string | null
  tags: string[]
  reservation_id: string | null
  recommendation: boolean
  inventory: string | null
  format: {
    id: number
    name: string
    branch: {
      id: number
      name: string
      steps: string
      currency: string
      ordering: string
      public: boolean
      pricelist: string
      cart: boolean
      content: string
    }
  }
  subtitle: string | null
  duplicate: boolean
}
