import styles from './ContactContent.module.scss'
import ContactForm from './components/ContactForm/ContactForm'

import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { useContext } from 'react'

import { IoLogoInstagram } from 'react-icons/io5'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function ContactContent() {
  const [theme] = useContext(ThemeContext)

  return (
    <div className={styles.content}>
      <div className='container'>
        <div
          className={`${styles.content__text} ${
            theme === 'dark' ? styles.content__darkText : ''
          }`}
        >
          <p className={styles.title}>Let's talk</p>
          <p className={styles.description}>
            If you have any queries or questions, get in touch with us here or
            give us a call on the number below. No request is too big or small
            and we are always happy to discuss how we may be able to help. We
            aim to reply within the same working day.
          </p>
        </div>

        <div
          className={`${styles.content__contact} ${
            theme === 'dark' ? styles.content__darkContact : ''
          }`}
        >
          <div className={styles.info}>
            <p>
              Telephone: <a href='tel: +34 678 123 456'>+34 678 123 456</a>
            </p>
            <p>
              Email:{' '}
              <a href='mailto: crbnparts@gmail.com'>crbnparts@gmail.com</a>
            </p>
            <p>
              Location: <span>Madrid, Calle de las Flores, 27</span>
            </p>
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
          <div className={styles.workingHours}>
            <p className={styles.title}>Working hours:</p>
            <p>Mon - Fri: 9:00 AM - 9:00 PM</p>
            <p>Sat: 9:00 AM - 7:00 PM</p>
            <p>Sun: Closed</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
