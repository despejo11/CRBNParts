import styles from './Header.module.scss'

import Menu from './components/Menu/Menu'
import ThemeToggle from '../../../app/theme/ThemeToggle'
import { ThemeContext } from '../../../app/providers/ThemeProvider'

import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useSelector } from 'react-redux'

import { BsDoorOpen } from 'react-icons/bs'
import { FaShoppingCart } from 'react-icons/fa'

export default function Header() {
  const [theme] = useContext(ThemeContext)

  const isRegistered = useSelector((state) => state.user.isRegistered)
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  const cartItems = useSelector((state) => state.cart.items)
  const uniqueProductsInCart = cartItems.length

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
            <img
              className={styles.logo}
              src='/images/other/Logo.png'
              alt='Logo'
            />
          </Link>
          <div
            className={`${styles.links} ${
              theme === 'dark' ? styles.darkLinks : ''
            }`}
          >
            <Link to='/'>Home</Link>
            <Link to='/shop'>Shop</Link>
            <Link to='/about'>About</Link>
            <Link to='/testimonials'>Testimonials</Link>
            <Link to='/team'>Team</Link>
            <Link to='/contact'>Contact</Link>
            {isLoggedIn && <Link to='/profile'>Profile</Link>}
          </div>

          <div className={styles.buttons}>
            <ThemeToggle />
            {!isLoggedIn && (
              <Link to={isRegistered ? '/signin' : '/signup'}>
                <button className={styles.sign}>
                  <BsDoorOpen />
                </button>
              </Link>
            )}
            {isLoggedIn && (
              <Link to='/cart' className={styles.cart}>
                {uniqueProductsInCart !== 0 && (
                  <span>{uniqueProductsInCart}</span>
                )}
                <FaShoppingCart />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
