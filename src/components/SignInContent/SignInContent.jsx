import styles from './SignInContent.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { login } from '../../features/user/userSlice'

import { useContext, useState } from 'react'

import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { PiWarningCircleLight } from 'react-icons/pi'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import { IoArrowBackOutline } from 'react-icons/io5'

import { quantum } from 'ldrs'
quantum.register()

export default function SignInContent() {
  const [theme] = useContext(ThemeContext)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState()
  const [showError, setShowError] = useState()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    const storedName = localStorage.getItem('userName')
    const storedPassword = localStorage.getItem('userPassword')

    setLoading(true)

    if (data.name === storedName && data.password === storedPassword) {
      setShowError(false)
      setTimeout(() => {
        setLoading(false)
        dispatch(login(data))
        navigate('/')
        window.location.reload()
        window.scrollTo(0, 0)
        reset()
      }, 2000)
    } else {
      setLoading(false)
      setShowError(true)
    }
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
          <p className={styles.title}>Sign in CRBNParts</p>
          <p className={styles.titled}>Enter your data below</p>

          <div className={styles.flex}>
            <form
              className={theme === 'dark' ? styles.darkForm : ''}
              onSubmit={handleSubmit(onSubmit)}
            >
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
                  {...register('password', {
                    required: 'Required',
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-z])(?!.* ).*$/,
                      message: 'Invalid',
                    },
                    minLength: {
                      value: 8,
                      message: 'Max length 8',
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

              {showError && (
                <p className={styles.invalidError}>
                  <PiWarningCircleLight /> Invalid Name or Password!
                </p>
              )}
            </form>
          </div>
          <p className={styles.question}>
            Not signed in yet? <Link to='/signup'>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
