import styles from './Menu.module.scss'

import { ThemeContext } from '../../../../../app/providers/ThemeProvider'

import { Link } from 'react-router-dom'
import { useContext, useRef, useState } from 'react'

import { IoMenu, IoClose, IoLogoInstagram } from 'react-icons/io5'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(useGSAP)

export default function Menu() {
  const [theme] = useContext(ThemeContext)

  const [isOpen, setIsOpen] = useState(false)

  const menu = useRef(null)

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState)
  }

  useGSAP(() => {
    if (isOpen) {
      gsap.to(menu.current, { opacity: 1, duration: 0.3, display: 'block' })
      document.documentElement.style.overflow = 'hidden'
    } else {
      gsap.to(menu.current, { opacity: 0, duration: 0.3, display: 'none' })
      document.documentElement.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={handleToggle}
        className={`${styles.icon} ${theme === 'dark' ? styles.darkIcon : ''}`}
      >
        {isOpen ? <IoClose /> : <IoMenu />}
      </button>

      <div
        ref={menu}
        className={`${styles.menu} ${theme === 'dark' ? styles.darkMenu : ''}`}
      >
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
        <div
          className={`${styles.contact} ${
            theme === 'dark' ? styles.darkContact : ''
          }`}
        >
          <a
            href=''
            className={`${styles.contact__icon} ${
              theme === 'dark' ? styles.darkContact__icon : ''
            }`}
          >
            <IoLogoInstagram />
          </a>
          <a
            href=''
            className={`${styles.contact__icon} ${
              theme === 'dark' ? styles.darkContact__icon : ''
            }`}
          >
            <FaFacebookSquare />
          </a>
          <a
            href=''
            className={`${styles.contact__icon} ${
              theme === 'dark' ? styles.darkContact__icon : ''
            }`}
          >
            <FaXTwitter />
          </a>
        </div>
      </div>
    </>
  )
}
