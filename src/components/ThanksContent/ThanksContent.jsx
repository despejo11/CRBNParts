import styles from './ThanksContent.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider'

import { Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'

export default function ThanksContent() {
  const [theme] = useContext(ThemeContext)

  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    const orderHistory = JSON.parse(localStorage.getItem('OrderHistory')) || []

    if (orderHistory.length > 0) {
      const latestOrder = orderHistory[orderHistory.length - 1]
      setOrderId(latestOrder.id)
    }
  }, [])

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <div className='container'>
        <p className={styles.title}>Thank you for trusting us!</p>
        <p className={styles.titled}>
          We will try to get back to you as soon as possible, you can go to{' '}
          <Link to='/profile'>Profile</Link> to review your order.
        </p>

        {orderId && (
          <p className={styles.orderId}>
            Order ID: <span>{orderId}</span>
          </p>
        )}
      </div>
    </div>
  )
}
