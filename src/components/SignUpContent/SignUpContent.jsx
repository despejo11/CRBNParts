import styles from './SignUpContent.module.scss'
import useLocalStorage from '../../../app/hooks/useLocalStorage'
import ThemeToggle from '../../../app/theme/ThemeToggle'
import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { register as registerUser } from '../../features/user/userSlice'

import { useContext, useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { PiWarningCircleLight } from 'react-icons/pi'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import { IoArrowBackOutline } from 'react-icons/io5'

import { quantum } from 'ldrs'
quantum.register()

export default function SignUpContent() {
  const [theme] = useContext(ThemeContext)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useLocalStorage('UserName', '')
  const [email, setEmail] = useLocalStorage('UserEmail', '')
  const [password, setPassword] = useLocalStorage('UserPassword', '')
  const [date, setDate] = useLocalStorage('RegistrationDate', '')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    const currentDate = new Date().toLocaleString()

    setLoading(true)
    setDate(currentDate)

    setTimeout(() => {
      setLoading(false)
      dispatch(registerUser(data))
      setName(data.name)
      setEmail(data.email)
      setPassword(data.password)
      navigate('/')
      window.location.reload()
      window.scrollTo(0, 0)
      reset()
    }, 3000)
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
      <button className={styles.back} onClick={() => navigate(-1)}>
        <IoArrowBackOutline />
      </button>

      <div className={styles.form}>
        <div className={styles.inner}>
          <img src='/images/other/Logo.png' alt='Logo' />
          <p className={styles.title}>Sign up CRBNParts</p>
          <p className={styles.titled}>Enter your data below</p>

          <div className={styles.flex}>
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
                      value: 2,
                      message: 'Min length 2',
                    },
                    maxLength: {
                      value: 15,
                      message: 'Max length 15',
                    },
                  })}
                  disabled={loading}
                  className={loading ? styles.submitSuccessfulInput : ''}
                  type='text'
                  placeholder='Name'
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
                  disabled={loading}
                  className={loading ? styles.submitSuccessfulInput : ''}
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
                  {...register('password', {
                    required: 'Required',
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-z])(?!.* ).*$/,
                      message: 'Invalid',
                    },
                    minLength: {
                      value: 8,
                      message: 'Min length 8',
                    },
                    maxLength: {
                      value: 16,
                      message: 'Max length 16',
                    },
                  })}
                  disabled={loading}
                  className={loading ? styles.submitSuccessfulInput : ''}
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  autoComplete='new-password'
                />
                {errors?.password && (
                  <p className={styles.error}>
                    <PiWarningCircleLight />
                    {errors.password.message}
                  </p>
                )}
                <button type='button' onClick={togglePasswordVisibility}>
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

              <button
                disabled={loading}
                className={`${styles.submit} ${
                  loading ? styles.submitSuccessfulBtn : ''
                }`}
              >
                {loading ? (
                  <l-quantum size='15' speed='1.75' color='#e7e7e7'></l-quantum>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
          <p className={styles.question}>
            Already have an account? <Link to='/signin'>Sign in</Link>
          </p>
        </div>
      </div>

      <div className={styles.info}>
        <ThemeToggle />
        <p>© 2024 CRBNParts, all rights reserved.</p>
      </div>
    </div>
  )
}
