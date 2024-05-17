import styles from './OrderHistory.module.scss'
import { ThemeContext } from '../../../../../app/providers/ThemeProvider'

import { useContext } from 'react'

export default function OrderHistory() {
  const [theme] = useContext(ThemeContext)

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <p className={styles.title}>All your orders</p>
      <p className={styles.titled}>You can review your entire order history</p>
    </div>
  )
}
