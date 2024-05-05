import styles from './Header.module.scss'

import Menu from '../Menu/Menu'
import ThemeToggle from '../../../app/theme/ThemeToggle'
import { ThemeContext } from '../../../app/providers/ThemeProvider'

import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { BsDoorOpen } from 'react-icons/bs'

export default function Header() {
  const [theme] = useContext(ThemeContext)

  return (
    <header
      className={`${styles.header} ${
        theme === 'dark' ? styles.darkHeader : ''
      }`}
    >
      <div className='container'>
        <div className={styles.content}>
          <div className={styles.menu}>
            <Menu />
          </div>
          <Link to='/'>
            <img className={styles.logo} src='/Logo.png' alt='Logo' />
          </Link>
          <div
            className={`${styles.links} ${
              theme === 'dark' ? styles.darkLinks : ''
            }`}
          >
            <Link to='/'>Home</Link>
            <Link to='/parts'>Parts</Link>
            <Link to='/about'>About</Link>
            <Link to='/testimonials'>Testimonials</Link>
            <Link to='/team'>Team</Link>
            <Link to='/contact'>Contact</Link>
          </div>
          <div className={styles.buttons}>
            <ThemeToggle />
            <button className={styles.sign}>
              <BsDoorOpen />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
