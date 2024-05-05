import styles from './Subscribe.module.scss'

import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { useContext } from 'react'

import { scroller } from 'react-scroll'

export default function Subscribe() {
  const [theme] = useContext(ThemeContext)

  const scrollToFooter = () => {
    scroller.scrollTo('footer', {
      duration: 1000,
      smooth: true,
      offset: -50,
    })
  }

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
          <p className={styles.notification}>
            If you subscribe, there is a chance to get a 10% discount on your
            next purchase.
          </p>
          <button onClick={scrollToFooter}>Subscribe</button>
        </div>
      </div>
    </div>
  )
}
