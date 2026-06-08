const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-")
  const monthIndex = parseInt(month, 10) - 1
  return `${MONTHS[monthIndex]} ${parseInt(day, 10)}, ${year}`
}

export function formatDateShort(dateString: string): string {
  const [, month, day] = dateString.split("-")
  const monthIndex = parseInt(month, 10) - 1
  return `${MONTHS_SHORT[monthIndex]} ${parseInt(day, 10)}`
}
