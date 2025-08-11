export const monthsShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic']
const msDay = 24 * 60 * 60 * 1000
const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate())

export const PERIODS = [
  { id: 50, startDay: 1, emissionDay: 1, dueDay: 21, dueOffset: 0 },
  { id: 51, startDay: 1, emissionDay: 15, dueDay: 15, dueOffset: 1 },
  { id: 52, startDay: 8, emissionDay: 8, dueDay: 28, dueOffset: 1 },
  { id: 53, startDay: 16, emissionDay: 16, dueDay: 6, dueOffset: 1 },
  { id: 54, startDay: 23, emissionDay: 23, dueDay: 13, dueOffset: 1 },
]

export const fmtDM = (d) => `${d.getDate()}-${monthsShort[d.getMonth()]}`

export function startRef(mode, today = new Date()) {
  return mode === 'year'
    ? new Date(today.getFullYear(), 0, 1)
    : new Date(today.getFullYear(), today.getMonth(), 1)
}

export function buildSchedule(period, refDate, months = 12, today = new Date()) {
  const out = []
  const today0 = startOfDay(today)

  for (let i = 0; i < months; i++) {
    const base = new Date(refDate.getFullYear(), refDate.getMonth() + i, 1)

    const inicio = new Date(base.getFullYear(), base.getMonth(), period.startDay)
    const fin = new Date(base.getFullYear(), base.getMonth() + 1, period.startDay - 1)
    const emision = new Date(base.getFullYear(), base.getMonth() + 1, period.emissionDay)
    const vencimiento = new Date(base.getFullYear(), base.getMonth() + 1 + period.dueOffset, period.dueDay)

    const inicio0 = startOfDay(inicio)
    const fin0 = startOfDay(fin)

    let status = null
    let daysUntilInicio = null

    if (today0 >= inicio0 && today0 <= fin0) {
      status = 'vigente'
    } else if (today0 < inicio0 &&
      today0.getMonth() === base.getMonth() &&
      today0.getFullYear() === base.getFullYear()) {
      status = 'proximo'
      // diferencia en días naturales (ej: 10→16 = 6 días)
      daysUntilInicio = Math.round((inicio0 - today0) / msDay)
    }

    out.push({ inicio, fin, emision, vencimiento, status, daysUntilInicio })
  }
  return out
}
