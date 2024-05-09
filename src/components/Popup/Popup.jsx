import styles from './Popup.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider'

import { useContext, useEffect, useRef } from 'react'
import { IoClose } from 'react-icons/io5'

import gsap from 'gsap'

export default function Popup({ children, openPopup, setOpenPopup }) {
  const [theme] = useContext(ThemeContext)

  const wrapper = useRef(null)
  const content = useRef(null)
  const overlay = useRef(null)

  useEffect(() => {
    if (openPopup) {
      gsap.set(content.current, {
        opacity: 0,
        y: 30,
        scale: 0.92,
        display: 'none',
      })
      gsap.to(content.current, {
        opacity: 1,
        duration: 0.4,
        y: 0,
        scale: 1,
        display: 'block',
      })
      gsap.to(overlay.current, {
        opacity: 1,
        duration: 0.5,
        display: 'block',
      })
      document.documentElement.style.overflow = 'hidden'
    }
  }, [openPopup])

  const closePopup = () => {
    gsap.to(content.current, {
      opacity: 0,
      duration: 0.4,
      y: 30,
      scale: 0.92,
      display: 'none',
    })
    gsap.to(overlay.current, {
      opacity: 0,
      duration: 0.5,
      display: 'none',
      onComplete: () => {
        setOpenPopup(false)
      },
    })
    document.documentElement.style.overflow = 'auto'
  }

  const onWrapperClick = (event) => {
    if (event.target === wrapper.current) {
      closePopup()
    }
  }

  return (
    openPopup && (
      <div ref={overlay} className={styles.overlay} onClick={onWrapperClick}>
        <div className={styles.wrapper} ref={wrapper}>
          <div
            ref={content}
            className={`${styles.content} ${
              theme === 'dark' ? styles.darkContent : ''
            }`}
          >
            <button className={styles.close} onClick={closePopup}>
              <IoClose />
            </button>
            {children}
          </div>
        </div>
      </div>
    )
  )
}
