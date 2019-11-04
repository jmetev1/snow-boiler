export const providers = [
  "Tammie Pomona",
  "Alli Ogdon",
  "Krisha Cristabel",
  "Jordan Martell"
]
export const r = ar => ar[Math.floor(Math.random() * ar.length)]
export const reasons = [
  "Educational Lunch",
  "Resupply",
  "In-Service",
  "Issue Resolution/Tech Support",
  "Educational Visit"
]
export const clinics = [
  "Sunshine Clinic",
  "Best providers Office",
  "Big Alligator providers"
]

export const firstState = () => ({
  provider: '',
  amountSpent: (Math.random() * 45).toFixed(2),
  date: new Date(),
  reason: r(reasons),
  materials: 'stuff',
  receipt: 'coming soon'
})