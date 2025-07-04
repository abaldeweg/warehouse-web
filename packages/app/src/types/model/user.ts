import type { Branch } from './branch'

export type User = {
  id: number
  username: string
  roles: string[]
  branch: Branch
  isUser: boolean
  isAdmin: boolean
}
