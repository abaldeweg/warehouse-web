import type { Ref } from 'vue'
import type { User } from './model/user'
import type { Stats } from './model/stats'
import type { Book } from './model/book'
import type { Reservation } from './model/reservation'
import type { AxiosResponse } from 'axios'

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
  readonly reservationsCount: Ref<number>
  fetchReservations: () => Promise<void>
}
