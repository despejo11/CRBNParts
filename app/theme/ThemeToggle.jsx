import styles from './ThemeToggle.module.scss'

import { ThemeContext } from '../providers/ThemeProvider'
import { useContext } from 'react'

import { BsMoonStars, BsSun } from 'react-icons/bs'

export default function ThemeToggle() {
  const [theme, setTheme] = useContext(ThemeContext)

  function changeTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <button
        className={`${styles.toggle} ${theme === 'dark' ? styles.dark : ''}`}
        onClick={changeTheme}
      >
        {theme === 'light' ? <BsSun /> : <BsMoonStars />}
      </button>
    </>
  )
}
