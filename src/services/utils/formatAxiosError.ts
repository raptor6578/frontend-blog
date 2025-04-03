import axios from 'axios'

export function formatAxiosError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status || ''
    const message = err.response?.data?.message || "Une erreur réseau est survenue."
    return `Erreur ${status}: ${message}`
  } else {
    return "Une erreur inconnue est survenue."
  }
}
