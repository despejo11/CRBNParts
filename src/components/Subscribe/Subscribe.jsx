import styles from './Subscribe.module.scss'

import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { useContext } from 'react'

export default function Subscribe() {
  const [theme] = useContext(ThemeContext)

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <div className='container'>
        <div className={styles.text}>
          <p>
            Stay in the know with our newsletter subscription! Get the latest
            updates and news.
          </p>
          <p className={styles.warning}>
            If you subscribe, there is a chance to get a 10% discount on your
            next purchase.
          </p>
        </div>
        <button>Subscribe</button>
      </div>
    </div>
  )
}
