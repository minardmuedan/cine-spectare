import { useEffect, useState } from 'react'

export const useCountDown = () => {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (timeLeft) {
      const intervalId = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000)
      return () => clearInterval(intervalId)
    }
  }, [timeLeft])

  return { timeLeft, setTimeLeft }
}
