import type { Branch } from './branch'

export type Inventory = {
  id: number
  branch_id: number
  branch: Branch
  startedAt: number | null
  endedAt: number | null
  found: number
  notFound: number
}
