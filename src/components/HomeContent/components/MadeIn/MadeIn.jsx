import styles from './MadeIn.module.scss'

import { ThemeContext } from '../../../../../app/providers/ThemeProvider'
import { useContext } from 'react'

export default function MadeIn() {
  const [theme] = useContext(ThemeContext)

  return (
    <div className='container'>
      <div
        className={`${styles.content} ${
          theme === 'dark' ? styles.darkContent : ''
        }`}
      >
        <p className={styles.title}>Made in Spain</p>
        <p className={styles.description}>
          One of the things that we’re most proud of is that back in 2021 we
          became “Made In Spain” Approved for the parts we produce and sell.
        </p>
        <br />
        <p className={styles.description}>
          This means that we are one of the only automotive carbon fiber
          manufacturers in the Spain with this accreditation that sets us apart
          from the rest of other part sellers out there.
        </p>
        <button>Learn More</button>
      </div>
    </div>
  )
}
