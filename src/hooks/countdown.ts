import { useEffect, useState } from 'react'

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (timeLeft) {
      const intervalId = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
      return () => clearInterval(intervalId)
    }
  }, [timeLeft])

  return { timeLeft, setTimeLeft }
}
