import styles from './WhoWeAre.module.scss'

import { ThemeContext } from '../../../../../app/providers/ThemeProvider'
import { useContext } from 'react'

import { Link } from 'react-router-dom'

export default function WhoWeAre() {
  const [theme] = useContext(ThemeContext)

  return (
    <div className='container'>
      <div className={styles.content}>
        <div
          className={`${styles.content__text} ${
            theme === 'dark' ? styles.content__darkText : ''
          }`}
        >
          <p className={styles.title}>Who we are?</p>
          <p className={styles.description}>
            Looking for carbon fiber car parts for your vehicle? You've come to
            the right place! We offer a variety of options including bumpers,
            splitters, hoods, and more.
          </p>
          <Link to='/about'>
            <button>Learn More</button>
          </Link>
        </div>
        <img
          className={styles.image}
          src='/HomeContent.png'
          alt='Carbon Fiber Figure'
        />
      </div>
    </div>
  )
}
