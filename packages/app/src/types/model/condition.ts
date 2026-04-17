import type { Branch } from './branch'

export type Condition = {
  id: number
  name: string
  branch_id: number
  branch: Branch
}
