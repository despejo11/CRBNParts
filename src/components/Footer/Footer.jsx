import styles from './Footer.module.scss'
import PopupSubscribe from './components/PopupSubscribe/PopupSubscribe'
import useLocalStorage from '../../../app/hooks/useLocalStorage'
import ThemeToggle from '../../../app/theme/ThemeToggle'
import { ThemeContext } from '../../../app/providers/ThemeProvider'

import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useContext, useState, useEffect } from 'react'

import { IoLogoInstagram, IoCheckmark } from 'react-icons/io5'
import { IoIosArrowUp } from 'react-icons/io'
import { PiWarningCircleLight } from 'react-icons/pi'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { animateScroll as scroll } from 'react-scroll'

import { quantum } from 'ldrs'
quantum.register()

export default function Footer() {
  const [theme] = useContext(ThemeContext)

  const [openPopup, setOpenPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useLocalStorage('SubscribeEmail', '')
  const [formSubmitted, setFormSubmitted] = useLocalStorage('Subscribed', 'no')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    setLoading(true)
    setUserEmail(data.email)
    reset()
    setTimeout(() => {
      setLoading(false)
      setOpenPopup(true)
    }, 3000)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setFormSubmitted('yes')
    }
  }, [isSubmitSuccessful])

  const scrollToTop = () => {
    scroll.scrollToTop({ duration: 1000 })
  }

  return (
    <footer id='footer' className={theme === 'dark' ? styles.darkFooter : ''}>
      <div className='container'>
        <div
          className={`${styles.subscribe} ${
            theme === 'dark' ? styles.darkSubscribe : ''
          }`}
        >
          <div>
            <p>
              Stay in the know with our newsletter subscription! Get the latest
              updates and news.
            </p>
            <p className={styles.notification}>
              If you subscribe, there is a chance to get a 10% discount on your
              next purchase.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('email', {
                required: 'Required',
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  message: 'Invalid',
                },
              })}
              defaultValue={userEmail}
              disabled={formSubmitted === 'yes'}
              className={
                formSubmitted === 'yes' ? styles.submitSuccessfulInput : ''
              }
              type='text'
              placeholder='Enter Your Email'
              autoComplete='email'
            />
            <div>
              <button
                className={
                  formSubmitted === 'yes' ? styles.submitSuccessfulBtn : ''
                }
                disabled={formSubmitted === 'yes'}
              >
                {loading ? (
                  <l-quantum size='15' speed='1.75' color='#e7e7e7'></l-quantum>
                ) : formSubmitted === 'yes' ? (
                  <IoCheckmark />
                ) : (
                  'Submit'
                )}
              </button>
              {errors?.email && (
                <p>
                  <PiWarningCircleLight />
                  {errors.email.message}
                </p>
              )}
            </div>
          </form>
        </div>

        {isSubmitSuccessful && (
          <PopupSubscribe openPopup={openPopup}>
            <p
              className={`${styles.popupTitle} ${
                theme === 'dark' ? styles.darkPopupTitle : ''
              }`}
            >
              Thank you!
            </p>
            <br />
            <p
              className={`${styles.popupDescription} ${
                theme === 'dark' ? styles.darkPopupDescription : ''
              }`}
            >
              Now the email you specified (<span>{userEmail}</span>) will
              receive the latest updates and news.
            </p>
          </PopupSubscribe>
        )}

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
              <p>Mon - Fri: 9:00AM - 9:00PM</p>
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
            <img src='/Logo.png' alt='Logo' />
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
              <IoIosArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
