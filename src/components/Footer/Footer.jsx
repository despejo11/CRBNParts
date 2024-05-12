import styles from './Footer.module.scss'
import Subscribe from './components/Subscribe/Subscribe'
import ThemeToggle from '../../../app/theme/ThemeToggle'
import { ThemeContext } from '../../../app/providers/ThemeProvider'

import { Link } from 'react-router-dom'
import { useContext } from 'react'

import { IoLogoInstagram, IoArrowUpOutline } from 'react-icons/io5'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { animateScroll as scroll } from 'react-scroll'

export default function Footer() {
  const [theme] = useContext(ThemeContext)

  const scrollToTop = () => {
    scroll.scrollToTop({ duration: 1000 })
  }

  return (
    <footer id='footer' className={theme === 'dark' ? styles.darkFooter : ''}>
      <div className='container'>
        <Subscribe />
        <div
          className={`${styles.columns} ${
            theme === 'dark' ? styles.darkColumns : ''
          }`}
        >
          <div
            className={`${styles.columns__contentCRBNParts} ${
              theme === 'dark' ? styles.columns__darkContentCRBNParts : ''
            }`}
          >
            <p className={styles.title}>CRBNParts</p>
            <div className={styles.links}>
              <a href='tel: +34 678 123 456'>+34 678 123 456</a>
              <a href='mailto: crbnparts@gmail.com'>crbnparts@gmail.com</a>
              <p>Madrid, Calle de las Flores, 27</p>
            </div>
            <div className={styles.icons}>
              <a href=''>
                <IoLogoInstagram />
              </a>
              <a href=''>
                <FaFacebookSquare />
              </a>
              <a href=''>
                <FaXTwitter />
              </a>
            </div>
          </div>

          <div
            className={`${styles.columns__contentCompany} ${
              theme === 'dark' ? styles.columns__darkContentCompany : ''
            }`}
          >
            <p className={styles.title}>Company</p>
            <div className={styles.links}>
              <Link to='/about'>About</Link>
              <Link to='/testimonials'>Testimonials</Link>
              <Link to='/team'>Team</Link>
              <Link to='/contact'>Contact</Link>
            </div>
          </div>

          <div
            className={`${styles.columns__contentWorkingHours} ${
              theme === 'dark' ? styles.columns__darkContentWorkingHours : ''
            }`}
          >
            <p className={styles.title}>Working hours</p>
            <div className={styles.text}>
              <p>Mon - Fri: 9:00 AM - 9:00 PM</p>
              <p>Sat: 9:00 AM - 7:00 PM</p>
              <p>Sun: Closed</p>
            </div>
          </div>
        </div>

        <div className={styles.disclaimer}>
          <div
            className={`${styles.content} ${
              theme === 'dark' ? styles.darkContent : ''
            }`}
          >
            <img src='/images/other/Logo.png' alt='Logo' />
            <div>
              <p className={styles.description}>
                CRBNParts are independent car parts, our company does not
                endorse or affiliate with any car manufacturer.
              </p>
              <p className={styles.reserved}>
                © 2024 CRBNParts, all rights reserved.
              </p>
            </div>
          </div>
          <div className={styles.buttons}>
            <ThemeToggle />
            <button
              onClick={scrollToTop}
              className={`${styles.scrollButton} ${
                theme === 'dark' ? styles.darkScrollButton : ''
              }`}
            >
              <IoArrowUpOutline />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
