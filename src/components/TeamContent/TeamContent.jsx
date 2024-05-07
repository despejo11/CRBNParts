import styles from './TeamContent.module.scss'

import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { useContext } from 'react'

export default function TeamContent() {
  const [theme] = useContext(ThemeContext)

  return (
    <div className='container'>
      <div
        className={`${styles.content} ${
          theme === 'dark' ? styles.darkContent : ''
        }`}
      >
        <div className={styles.card}>
          <img
            className={styles.image1br}
            src='/DanielRamirez.png'
            alt='Daniel Ramirez'
          />
          <p className={styles.name}>Daniel Ramirez</p>
          <p className={styles.position}>CEO</p>
        </div>

        <div className={styles.card}>
          <img
            className={styles.image2br}
            src='/AnaPerez.png'
            alt='Ana Perez'
          />
          <p className={styles.name}>Ana Perez</p>
          <p className={styles.position}>Finance Manager</p>
        </div>

        <div className={styles.card}>
          <img
            className={styles.image3br}
            src='/LuisRodriguez.png'
            alt='Luis Rodriguez'
          />
          <p className={styles.name}>Luis Rodriguez</p>
          <p className={styles.position}>Sales Manager</p>
        </div>

        <div className={styles.card}>
          <img
            className={styles.image2br}
            src='/MariaGarcia.png'
            alt='Maria Garcia'
          />
          <p className={styles.name}>Maria Garcia</p>
          <p className={styles.position}>HR Specialist</p>
        </div>

        <div className={styles.card}>
          <img
            className={styles.image3br}
            src='/JuanLopez.png'
            alt='Juan Lopez'
          />
          <p className={styles.name}>Juan Lopez</p>
          <p className={styles.position}>Operations Director</p>
        </div>

        <div className={styles.card}>
          <img
            className={styles.image1br}
            src='/AlejandroMartinez.png'
            alt='Alejandro Martinez'
          />
          <p className={styles.name}>Alejandro Martinez</p>
          <p className={styles.position}>Production Engineer</p>
        </div>
      </div>

      <p
        className={`${styles.warning} ${
          theme === 'dark' ? styles.darkWarning : ''
        }`}
      >
        * Please note that we've only listed a fraction of our team.
      </p>
    </div>
  )
}
