import styles from './CartContent.module.scss'
import { removeItem, updateItemQuantity } from '../../features/cart/cartSlice'
import { ThemeContext } from '../../../app/providers/ThemeProvider'

import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { IoCheckmark, IoClose, IoReload } from 'react-icons/io5'
import { IoIosEye } from 'react-icons/io'
import { FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi'

import { quantum } from 'ldrs'
quantum.register()

export default function CartContent() {
  const [theme] = useContext(ThemeContext)

  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const [loadingRemove, setLoadingRemove] = useState(false)

  const handleRemoveItem = (itemId) => {
    setLoadingRemove((prevState) => ({
      ...prevState,
      [itemId]: true,
    }))

    setTimeout(() => {
      dispatch(removeItem({ id: itemId }))
      setLoadingRemove((prevState) => {
        const newState = { ...prevState }
        delete newState[itemId]
        return newState
      })
    }, 1000)
  }

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <div className='container'>
        {cart.items.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>You have no products in your cart.</p>
            <p className={styles.goToShop}>
              Go to the <Link to='/shop'>Shop</Link> and buy what you need!
            </p>
          </div>
        ) : (
          <div className={styles.flex}>
            <div className={styles.order}>
              <div className={styles.description}>
                <p>
                  Total Quantity: <span>{cart.totalQuantity}</span>
                </p>
                <p>
                  Delivery: <span>Free</span>
                </p>
                <p className={styles.totalPrice}>
                  Total price: <span>€ {cart.totalPrice}</span>
                </p>
              </div>

              <div className={styles.buyButtons}>
                <button className={styles.google}>
                  Buy with <FcGoogle /> Pay
                </button>
                <button className={styles.apple}>
                  Buy with <FaApple /> Pay
                </button>
              </div>
              <p className={styles.warning}>
                * Adding to cart is not a reservation of the item!
              </p>

              <div className={styles.info}>
                <p>
                  <IoCheckmark /> Safe shopping at CRBNParts
                </p>
                <p>
                  <IoReload /> 30 days to return
                </p>
              </div>
            </div>

            <div className={styles.items}>
              {cart.items.map((item) => (
                <div className={styles.item} key={item.id}>
                  <div className={styles.border}></div>

                  <Link className={styles.linkImage} to={`/shop/${item.id}`}>
                    <img src={item.image} alt={item.alt} />
                    <button>
                      <IoIosEye />
                    </button>
                  </Link>
                  <div className={styles.productDescription}>
                    <p className={styles.makeModel}>
                      {item.make} <span>{item.model}</span>
                    </p>
                    <p className={styles.productType}>{item.productType}</p>
                    {item.availability === 'Available' ? (
                      <p className={styles.available}>
                        <IoCheckmark /> Available
                      </p>
                    ) : (
                      <p className={styles.notAvailable}>
                        <IoClose /> Not available
                      </p>
                    )}
                  </div>

                  <div className={styles.priceContent}>
                    <div className={styles.flex}>
                      <p className={styles.price}>
                        € {item.price * item.quantity}
                      </p>
                      {item.quantity >= 2 && (
                        <p className={styles.perOne}>
                          Per one: <span>€ {item.price}</span>
                        </p>
                      )}
                    </div>

                    <div className={styles.quantity}>
                      <button
                        onClick={() =>
                          dispatch(
                            updateItemQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        disabled={item.quantity === 1}
                        className={item.quantity === 1 ? styles.added : ''}
                      >
                        <HiOutlineMinusSm />
                      </button>

                      <p>{item.quantity}</p>
                      <button
                        onClick={() =>
                          dispatch(
                            updateItemQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        disabled={item.quantity >= 10}
                        className={item.quantity >= 10 ? styles.added : ''}
                      >
                        <HiOutlinePlusSm />
                      </button>
                    </div>
                  </div>

                  <button
                    className={`${styles.remove} ${
                      loadingRemove[item.id] ? styles.added : ''
                    }`}
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={loadingRemove[item.id]}
                  >
                    {loadingRemove[item.id] ? (
                      <l-quantum
                        size='15'
                        speed='1.75'
                        color='#e7e7e7'
                      ></l-quantum>
                    ) : (
                      <IoClose />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
