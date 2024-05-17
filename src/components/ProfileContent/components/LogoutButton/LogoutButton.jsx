import styles from './LogoutButton.module.scss'
import Popup from '../../../Popup/Popup'
import { logout } from '../../../../features/user/userSlice'
import { ThemeContext } from '../../../../../app/providers/ThemeProvider'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useState, useContext } from 'react'

import { quantum } from 'ldrs'
quantum.register()

export default function LogoutButton() {
  const [theme] = useContext(ThemeContext)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [openPopup, setOpenPopup] = useState()
  const [loading, setLoading] = useState(false)

  const handleLogout = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      dispatch(logout())
      navigate('/')
      window.location.reload()
      window.scrollTo(0, 0)
    }, 2000)
  }

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <button className={styles.button} onClick={() => setOpenPopup(true)}>
        Logout
      </button>
      {openPopup && (
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <div className={styles.popup}>
            <p className={styles.title}>Logout</p>
            <br />
            <p className={styles.titled}>Are you sure you want to log out?</p>
            <button
              className={loading ? styles.isLoading : ''}
              disabled={loading}
              onClick={handleLogout}
            >
              {loading ? (
                <l-quantum size='15' speed='1.75' color='#e7e7e7'></l-quantum>
              ) : (
                'Yes'
              )}
            </button>
          </div>
        </Popup>
      )}
    </div>
  )
}
