import type { LottiePlayer } from 'lottie-web'
import { useEffect, useState } from 'react'

export const useAsyncLottie = (): LottiePlayer | null => {
  const [lottie, setLottie] = useState<LottiePlayer | null>(null)

  useEffect(() => {
    import('lottie-web').then((Lottie) => setLottie(Lottie.default))
  }, [])

  return lottie
}
