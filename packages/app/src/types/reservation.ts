import type { Book } from './book'
import type { Branch } from './branch'

export type Reservation = {
  id: string
  branch_id: number
  branch: Branch
  createdAt: number
  notes: string
  books: Book[]
  salutation: string
  firstname: string
  surname: string
  mail: string
  phone: string
  open: boolean
}
