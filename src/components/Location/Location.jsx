import styles from './Location.module.scss'

import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { useContext } from 'react'

export default function Location({ children }) {
  const [theme] = useContext(ThemeContext)

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <p>{children}</p>
      <img src='/LocationBg.png' alt='Carbon Fiber Figure' />
    </div>
  )
}
