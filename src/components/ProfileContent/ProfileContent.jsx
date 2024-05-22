import styles from './ProfileContent.module.scss'
import SubscribeLink from '../SubscribeLink/SubscribeLink'
import ProfileSettings from './components/ProfileSettings/ProfileSettings'
import OrderHistory from './components/OrderHistory/OrderHistory'
import { ThemeContext } from '../../../app/providers/ThemeProvider'

import { useContext, useState } from 'react'

import { quantum } from 'ldrs'
quantum.register()

export default function ProfileContent() {
  const [theme] = useContext(ThemeContext)

  const [activeButton, setActiveButton] = useState('settings')
  const [loading, setLoading] = useState(false)

  const handleOption = (buttonName) => {
    if (buttonName !== activeButton) {
      setLoading(true)
      setActiveButton(buttonName)
      setTimeout(() => {
        setLoading(false)
      }, 700)
    }
  }

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <div className='container'>
        <p className={styles.title}>Your profile</p>
        <p className={styles.titled}>
          Here you can edit your personal data, you can also review all your
          orders.
        </p>
      </div>

      <SubscribeLink />

      <div className='container'>
        <div className={styles.buttons}>
          <button
            className={activeButton === 'settings' ? styles.activeButton : ''}
            onClick={() => handleOption('settings')}
          >
            Settings
          </button>
          <p>│</p>
          <button
            className={activeButton === 'orders' ? styles.activeButton : ''}
            onClick={() => handleOption('orders')}
          >
            Orders
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <l-quantum
              size='55'
              speed='1.75'
              color={theme === 'dark' ? '#b6b6b6' : '#353535'}
            ></l-quantum>
          </div>
        ) : (
          <>
            {activeButton === 'settings' ? <ProfileSettings /> : null}
            {activeButton === 'orders' ? <OrderHistory /> : null}
          </>
        )}

        <p className={styles.warning}>
          * CRBNParts cares about your data and will not allow it to go into the
          public domain.
        </p>
      </div>
    </div>
  )
}
