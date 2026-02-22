import type { Branch } from './branch'

export type Genre = {
  id: number
  name: string
  branch_id: number
  branch: Branch
}
