import confetti from 'canvas-confetti'
import { ref } from 'vue'
import type { Ref } from 'vue'

export function useHolidays(): {
  date: Ref<Date>
  showPride: Ref<boolean>
  startHolidays: () => void
  stopHolidays: () => void
} {
  const date = ref<Date>(new Date())
  const hasParty = ref(false)
  const partyInterval = ref<number | null>(null)
  const hasSnow = ref(false)
  const snowInterval = ref<number | null>(null)
  const showPride = ref(false)

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

  return { date, showPride, startHolidays, stopHolidays }
}
