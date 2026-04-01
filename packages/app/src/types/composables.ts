import type { Ref } from 'vue'
import type { User } from './model/user'
import type { Stats } from './model/stats'
import type { Book } from './model/book'
import type { Reservation } from './model/reservation'
import type { AxiosResponse } from 'axios'
import type { Branch } from './model/branch'
import type { Analyze } from './model/analyze'
import type { Genre } from './model/genre'
import type { Tag } from './model/tag'
import type { Condition } from './model/condition'
import type { Format } from './model/format'
import type { Inventory } from './model/inventory'

export interface UseAuth {
  isAuthenticated: Ref<boolean>
  user: Ref<User | null>
  readonly lastCheck: Ref<number | null>
  checkAuthenticationStatus: () => Promise<boolean>
}

export interface UseToken {
  user: Ref<User | null>
  fetchUser: () => Promise<void>
}

export interface UsePassword {
  password: Ref<string | null>
  isChangingPassword: Ref<boolean>
  passwordSuccessful: Ref<boolean>
  passwordError: Ref<boolean>
  changePassword: () => Promise<void>
}

export interface UseLogin {
  username: Ref<string | null>
  password: Ref<string | null>
  isLoggingIn: Ref<boolean>
  invalidCredentials: Ref<boolean>
  login: () => Promise<void>
}

export interface UseLogout {
  logout: () => void
}

export interface UseDate {
  toLocaleDateString: (timestamp: number) => string
  isOlderThan: (days: number, timestamp: number) => boolean
}

export interface UseHolidays {
  date: Ref<Date>
  showPride: Ref<boolean>
  hasParty: Ref<boolean>
  hasSnow: Ref<boolean>
  startHolidays: () => void
  stopHolidays: () => void
}

export interface UseStats {
  stats: Ref<Stats | null>
  fetchStats: () => Promise<void>
}

export interface UseProduct {
  book: Ref<Book | null>
  show: (id: string) => Promise<void>
  update: (data: any) => Promise<void>
  sellAll: (products: Book[]) => void
  sell: (id: string) => Promise<AxiosResponse>
}

export interface UseReservation {
  reservation: Ref<Reservation | null>
  fetchReservation: (id: string) => Promise<void>
  updateReservation: () => Promise<void>
  removeReservation: () => Promise<void>
}

export interface UseReservations {
  reservations: Ref<Reservation[]>
  readonly countAllReservations: Ref<number>
  readonly countOpenReservations: Ref<number>
  readonly countOutdatedReservations: Ref<number>
  fetchReservations: () => Promise<void>
}

export interface UseBranch {
  branch: Ref<Branch | null>
  fetchBranch: (id: number) => Promise<void>
}

export interface UseAnalyze {
  analyze: Ref<Analyze[] | null>
  fetchShopSearch: (start?: string, end?: string) => Promise<void>
}

export interface UseGenres {
  genres: Ref<Genre[] | null>
  fetchGenres: () => Promise<void>
}

export interface UseGenre {
  createGenre: (name: string) => Promise<number>
  updateGenre: (id: number, name: string) => Promise<void>
  removeGenre: (id: number) => Promise<void>
}

export interface UseTags {
  tags: Ref<Tag[] | null>
  listTags: () => Promise<void>
}

export interface UseTag {
  createTag: (name: string) => Promise<number>
  updateTag: (id: number, name: string) => Promise<void>
  removeTag: (id: number) => Promise<void>
}

export interface UseConditions {
  conditions: Ref<Condition[] | null>
  listConditions: () => Promise<void>
}

export interface UseCondition {
  createCondition: (name: string) => Promise<number>
  updateCondition: (id: number, name: string) => Promise<void>
  removeCondition: (id: number) => Promise<void>
}

export interface UseFormats {
  formats: Ref<Format[] | null>
  listFormats: () => Promise<void>
}

export interface UseFormat {
  createFormat: (name: string) => Promise<number>
  updateFormat: (id: number, name: string) => Promise<void>
  removeFormat: (id: number) => Promise<void>
}

export interface UseInventory {
  inventories: Ref<Inventory[] | null>
  hasActiveInventory: Ref<boolean>
  listInventories: () => Promise<void>
  createInventory: () => Promise<void>
  endInventory: (id: number) => Promise<void>
}
