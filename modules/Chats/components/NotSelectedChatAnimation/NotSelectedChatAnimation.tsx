import { clsx } from 'clsx'
import { useAsyncLottie } from 'Core/utils/useAsyncLottie'
import { AnimationItem } from 'lottie-web'
import { FC, MutableRefObject, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './NotSelectedChatAnimation.module.scss'

interface NotSelectedChatProps {
  className?: string
}

const NotSelectedChatAnimation: FC<NotSelectedChatProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null)
  const infoAnimation = useRef<AnimationItem>()

  const lottie = useAsyncLottie()
  useEffect(() => {
    if (lottie) {
      infoAnimation.current = lottie.loadAnimation({
        container: ref.current!,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/images/animations/emptyChat.json',
      })
    } else {
      infoAnimation.current?.destroy()
    }
  }, [lottie])

  return (
    <div
      ref={ref as MutableRefObject<HTMLDivElement | null>}
      className={clsx(styles.animationArea, className)}
    />
  )
}

export default NotSelectedChatAnimation
