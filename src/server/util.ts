export function getDateString(date?: Date): string {
  if (typeof date === 'undefined') {
    date = new Date(Date.now())
  }
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
