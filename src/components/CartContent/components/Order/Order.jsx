import styles from './Order.module.scss'
import { ThemeContext } from '../../../../../app/providers/ThemeProvider'
import { clearCart } from '../../../../features/cart/cartSlice'

import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { PiWarningCircleLight } from 'react-icons/pi'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'

import { quantum } from 'ldrs'
quantum.register()

export default function Order({ paymentMethod }) {
  const [theme] = useContext(ThemeContext)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState()
  const [loadingData, setLoadingData] = useState(false)

  const totalQuantity = useSelector((state) => state.cart.totalQuantity)
  const totalPrice = useSelector((state) => state.cart.totalPrice)
  const cartItems = useSelector((state) => state.cart.items)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    setLoadingData(true)

    setTimeout(() => {
      setLoadingData(false)
      reset()
      const orderDetails = {
        id: Date.now(),
        ...data,
        totalQuantity,
        totalPrice,
        items: cartItems,
        paymentMethod,
        date: new Date().toLocaleString(),
      }

      const orderHistory =
        JSON.parse(localStorage.getItem('OrderHistory')) || []
      orderHistory.push(orderDetails)
      localStorage.setItem('OrderHistory', JSON.stringify(orderHistory))

      dispatch(clearCart())
      navigate('/thanks')
      window.location.reload()
    }, 6000)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <div className={styles.text}>
        <div>
          <p className={styles.title}>Order</p>
          <p className={styles.titled}>Enter your data below</p>
          <p className={styles.paymentMethod}>You use {paymentMethod}</p>
        </div>

        <div className={styles.total}>
          <p>
            Total quantity: <span>{totalQuantity}</span>
          </p>
          <p>
            Total price: <span>€ {totalPrice}</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input}>
          <input
            {...register('name', {
              required: 'Required',
              pattern: {
                value: /^[a-zA-Z\s.'-]+$/,
                message: 'Invalid',
              },
              minLength: {
                value: 5,
                message: 'Min length 5',
              },
              maxLength: {
                value: 35,
                message: 'Max length 35',
              },
            })}
            disabled={loadingData}
            className={loadingData ? styles.loadingInput : ''}
            type='text'
            placeholder='Full Name'
            autoComplete='name'
          />
          {errors?.name && (
            <p className={styles.error}>
              <PiWarningCircleLight />
              {errors.name.message}
            </p>
          )}
        </div>

        <div className={styles.input}>
          <input
            {...register('email', {
              required: 'Required',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid',
              },
              maxLength: {
                value: 100,
                message: 'Max length 100',
              },
            })}
            disabled={loadingData}
            className={loadingData ? styles.loadingInput : ''}
            type='text'
            placeholder='Email'
            autoComplete='email'
          />
          {errors?.email && (
            <p className={styles.error}>
              <PiWarningCircleLight />
              {errors.email.message}
            </p>
          )}
        </div>

        <div className={styles.input}>
          <input
            {...register('telephone', {
              required: 'Required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Invalid',
              },
              minLength: {
                value: 10,
                message: 'Length 10',
              },
              maxLength: {
                value: 10,
                message: 'Length 10',
              },
            })}
            disabled={loadingData}
            className={loadingData ? styles.loadingInput : ''}
            type='text'
            placeholder='Telephone'
            autoComplete='tel'
          />
          {errors?.telephone && (
            <p className={styles.error}>
              <PiWarningCircleLight />
              {errors.telephone.message}
            </p>
          )}
        </div>

        <div className={styles.input}>
          <input
            {...register('address', {
              required: 'Required',
              pattern: {
                value: /^[A-Za-z0-9\s,]*$/,
                message: 'Invalid',
              },
              minLength: {
                value: 10,
                message: 'Min length 10',
              },
              maxLength: {
                value: 35,
                message: 'Max length 35',
              },
            })}
            disabled={loadingData}
            className={loadingData ? styles.loadingInput : ''}
            type='text'
            placeholder='Full Address'
            autoComplete='address'
          />
          {errors?.address && (
            <p className={styles.error}>
              <PiWarningCircleLight />
              {errors.address.message}
            </p>
          )}
        </div>

        <div className={styles.input}>
          <input
            {...register('card', {
              pattern: {
                value: /^\d+$/,
                message: 'Invalid',
              },
              maxLength: {
                value: 19,
                message: 'Length 16',
              },
              minLength: {
                value: 19,
                message: 'Length 16',
              },
            })}
            value='1111 2222 3333 4444'
            disabled
            className={styles.loadingInput}
            type='text'
            placeholder='Card Number'
            autoComplete='off'
          />

          {errors?.card && (
            <p className={styles.error}>
              <PiWarningCircleLight />
              {errors.card.message}
            </p>
          )}
        </div>

        <div className={styles.input}>
          <input
            {...register('cvv', {
              pattern: {
                value: /^\d+$/,
                message: 'Invalid',
              },
              maxLength: {
                value: 3,
                message: 'Length 3',
              },
              minLength: {
                value: 3,
                message: 'Length 3',
              },
            })}
            value='123'
            disabled
            className={styles.loadingInput}
            type={showPassword ? 'text' : 'password'}
            placeholder='CVV'
            autoComplete='off'
          />
          {errors?.cvv && (
            <p className={styles.error}>
              <PiWarningCircleLight />
              {errors.cvv.message}
            </p>
          )}
          <button
            className={styles.toggle}
            type='button'
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <>
                <IoIosEye />
              </>
            ) : (
              <>
                <IoIosEyeOff />
              </>
            )}
          </button>
        </div>

        <div className={styles.input}>
          <input
            {...register('date', {
              pattern: {
                value: /^\d+$/,
                message: 'Invalid',
              },
              maxLength: {
                value: 5,
                message: 'Length 5',
              },
              minLength: {
                value: 5,
                message: 'Length 5',
              },
            })}
            value='08/26'
            disabled
            className={styles.loadingInput}
            type='text'
            placeholder='MM/YY'
            autoComplete='off'
          />
          {errors?.date && (
            <p className={styles.error}>
              <PiWarningCircleLight />
              {errors.date.message}
            </p>
          )}
        </div>

        <button
          className={`${styles.submit} ${
            loadingData ? styles.loadingButton : ''
          }`}
          disabled={loadingData}
          type='submit'
        >
          {loadingData ? (
            <l-quantum size='15' speed='1.75' color='#e7e7e7'></l-quantum>
          ) : (
            'Submit'
          )}
        </button>
      </form>

      <p className={styles.warning}>
        * We will contact you to clarify your order.
      </p>
    </div>
  )
}
