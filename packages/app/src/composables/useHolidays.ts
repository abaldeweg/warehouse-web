import confetti from 'canvas-confetti'
import { ref, readonly } from 'vue'
import type { UseHolidays } from '../types/composables'

/**
 * useHolidays composable for managing holiday effects like confetti and snow.
 */
export function useHolidays(): UseHolidays {
  const date = ref<Date>(new Date())
  const hasParty = ref(false)
  const partyInterval = ref<number | null>(null)
  const hasSnow = ref(false)
  const snowInterval = ref<number | null>(null)
  const showPride = ref(false)

  /**
   * Triggers a confetti burst at a given x position and drift.
   */
  const party = (x: number, drift: number): void => {
    confetti({
      particleCount: 25,
      startVelocity: 60,
      ticks: 200,
      origin: {
        x: x,
        y: 1,
      },
      shapes: ['circle'],
      gravity: Math.random(),
      scalar: Math.random(),
      drift: drift,
    })
  }

  /**
   * Triggers a snow-like confetti effect at a random position.
   */
  const snow = () => {
    confetti({
      particleCount: 5,
      startVelocity: 0,
      ticks: 300,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
      colors: ['#cccccc', '#bbbbbb', '#dddddd'],
      shapes: ['circle'],
      gravity: Math.random(),
      scalar: Math.random(),
      drift: Math.random(),
    })
  }

  /**
   * Starts holiday effects based on the current date.
   */
  const startHolidays = (): void => {
    const today = date.value
    const month = today.getMonth()
    const day = today.getDate()

    if ((month === 11 && day === 31) || (month === 0 && day >= 1 && day <= 6)) {
      hasParty.value = true
      partyInterval.value = setInterval(() => {
        if (!hasParty.value) return
        party(0, 0.5)
        party(1, -0.5)
      }, 300)
    }

    if (month === 11 || month === 0) {
      hasSnow.value = true
      snowInterval.value = setInterval(() => {
        if (!hasSnow.value) return
        snow()
      }, 200)
    }

    if (month === 5) {
      showPride.value = true
    }
  }

  /**
   * Stops all holiday effects and clears intervals.
   */
  const stopHolidays = (): void => {
    if (partyInterval.value) {
      clearInterval(partyInterval.value)
    }
    if (snowInterval.value) {
      clearInterval(snowInterval.value)
    }
    hasParty.value = false
    hasSnow.value = false
    showPride.value = false
  }

  return {
    date,
    hasParty: readonly(hasParty),
    hasSnow: readonly(hasSnow),
    showPride,
    startHolidays,
    stopHolidays,
  }
}
