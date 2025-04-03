import { useState } from 'react'

const useCooldown = (duration: number) => {
  const [isCooldown, setIsCooldown] = useState(false)

  const startCooldown = () => {
    setIsCooldown(true)
    setTimeout(() => {
      setIsCooldown(false)
    }, duration)
  }

  return { isCooldown, startCooldown }
}
export default useCooldown