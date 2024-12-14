import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
} from 'date-fns'

export const formatTimeAgo = (date: Date | string) => {
  const now = new Date()
  const targetDate = new Date(date)

  const years = differenceInYears(now, targetDate)
  if (years > 0) {
    return `${years}y`
  }

  const months = differenceInMonths(now, targetDate)
  if (months > 0) {
    return `${months}mo`
  }

  const days = differenceInDays(now, targetDate)
  if (days > 0) {
    return `${days}d`
  }

  const hours = differenceInHours(now, targetDate)
  if (hours > 0) {
    return `${hours}h`
  }

  const minutes = differenceInMinutes(now, targetDate)
  if (minutes > 0) {
    return `${minutes}m`
  }

  const seconds = differenceInSeconds(now, targetDate)
  return `${seconds}s`
}
