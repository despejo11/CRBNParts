import styles from './ErrorPage.module.scss'

import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { useContext } from 'react'

export default function ErrorPage() {
  const [theme] = useContext(ThemeContext)

  return (
    <div
      className={`${styles.error} ${theme === 'dark' ? styles.darkError : ''}`}
    >
      <div className='container'>
        <p className={styles.number}>404</p>
        <p className={styles.message}>Oh no, something went wrong.</p>
      </div>
    </div>
  )
}
