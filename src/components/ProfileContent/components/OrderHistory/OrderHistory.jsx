import styles from './OrderHistory.module.scss'
import { ThemeContext } from '../../../../../app/providers/ThemeProvider'

import { useContext, useEffect, useState } from 'react'

import { IoCheckmark } from 'react-icons/io5'

export default function OrderHistory() {
  const [theme] = useContext(ThemeContext)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const orderHistory = JSON.parse(localStorage.getItem('OrderHistory')) || []
    setOrders(orderHistory)
  }, [])

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <p className={styles.title}>All your orders</p>
      <p className={styles.titled}>You can review your entire order history</p>

      <div className={styles.orders}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className={styles.order}>
              <div className={styles.dateId}>
                <p className={styles.orderId}>
                  Order ID: <br />
                  <span>{order.id}</span>
                </p>
                <p className={styles.date}>{order.date}</p>
              </div>

              <p className={styles.paid}>
                <IoCheckmark /> Paid
              </p>

              <div className={styles.totals}>
                <p className={styles.total}>
                  Total quantity: <span>{order.totalQuantity}</span>
                </p>
                <p className={styles.total}>
                  Total price: <span>€ {order.totalPrice}</span>
                </p>
              </div>

              <p className={styles.paymentMethod}>
                Payment method: <span>{order.paymentMethod}</span>
              </p>

              <div className={styles.items}>
                {order.items.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <p className={styles.makeModel}>
                      <span>х{item.quantity}</span> {item.make}{' '}
                      <span>{item.model}</span>
                    </p>

                    <p className={styles.typePrice}>
                      {item.productType}
                      <span>Per one:</span> € {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noOrders}>You have no orders.</p>
        )}
      </div>
    </div>
  )
}
