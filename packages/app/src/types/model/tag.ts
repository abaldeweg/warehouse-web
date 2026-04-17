import type { Branch } from './branch'
import type { Book } from './book'

export type Tag = {
  id: number
  name: string
  branch_id: number
  branch: Branch
  books: Book[] | null
}
