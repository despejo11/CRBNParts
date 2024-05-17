import styles from './ThemeToggle.module.scss'

import { ThemeContext } from '../providers/ThemeProvider'
import { useContext } from 'react'

import { BsMoonStars, BsSun } from 'react-icons/bs'

export default function ThemeToggle() {
  const [theme, setTheme] = useContext(ThemeContext)

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <button
        className={`${styles.toggle} ${
          theme === 'dark' ? styles.darkToggle : ''
        }`}
        onClick={changeTheme}
      >
        {theme === 'light' ? <BsSun /> : <BsMoonStars />}
      </button>
    </>
  )
}
