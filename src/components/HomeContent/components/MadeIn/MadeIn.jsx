import styles from './MadeIn.module.scss'

import { ThemeContext } from '../../../../../app/providers/ThemeProvider'
import { useContext } from 'react'

import { Link } from 'react-router-dom'

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
          became “Made in Spain” Approved for the parts we produce and sell.
        </p>
        <p>
          This means that we are one of the only automotive carbon fiber
          manufacturers in the Spain with this accreditation that sets us apart
          from the rest of other part sellers out there.
        </p>
        <Link to='/about'>
          <button>Learn More</button>
        </Link>
      </div>
    </div>
  )
}
