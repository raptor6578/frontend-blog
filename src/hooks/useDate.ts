import { useCallback } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const useDate = () => {
  const formatDate = useCallback((date: Date | string) => {
    return format(new Date(date), 'EEEE d MMMM yyyy', { locale: fr })
  }, [])

  const formatShort = useCallback((date: Date | string) => {
    return format(new Date(date), 'dd/MM/yyyy', { locale: fr })
  }, [])

  const formatTime = useCallback((date: Date | string) => {
    return format(new Date(date), 'HH:mm', { locale: fr })
  }, [])

  return { formatDate, formatShort, formatTime }
}

export default useDate