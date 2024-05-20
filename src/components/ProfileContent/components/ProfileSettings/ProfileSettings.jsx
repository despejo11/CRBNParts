import styles from './ProfileSettings.module.scss'
import LogoutButton from '../LogoutButton/LogoutButton'
import { ThemeContext } from '../../../../../app/providers/ThemeProvider'

import { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { IoCheckmark, IoClose } from 'react-icons/io5'
import { CiEdit } from 'react-icons/ci'
import { PiWarningCircleLight } from 'react-icons/pi'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'

import { quantum } from 'ldrs'
quantum.register()

export default function ProfileSettings() {
  const [theme] = useContext(ThemeContext)

  const [showPassword, setShowPassword] = useState()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formChanged, setFormChanged] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  })

  const isEditing = () => {
    setEditing(true)
  }

  const cancelEditing = () => {
    const storedName = localStorage.getItem('UserName') || ''
    const storedEmail = localStorage.getItem('UserEmail') || ''
    const storedPassword = localStorage.getItem('UserPassword') || ''
    setValue('name', storedName)
    setValue('email', storedEmail)
    setValue('password', storedPassword)
    setEditing(false)
    clearErrors()
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = () => {
    setFormChanged(true)
  }

  const onSubmit = (data) => {
    if (!formChanged) {
      setLoading(false)
      localStorage.setItem('UserName', data.name)
      localStorage.setItem('UserPassword', data.password)
      setEditing(false)
      clearErrors()
    } else {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        localStorage.setItem('UserName', data.name)
        localStorage.setItem('UserPassword', data.password)
        setEditing(false)
        clearErrors()
        window.location.reload()
      }, 3000)
    }
  }

  useEffect(() => {
    const storedName = localStorage.getItem('UserName')
    const storedEmail = localStorage.getItem('UserEmail')
    const storedPassword = localStorage.getItem('UserPassword')

    if (storedName) setValue('name', storedName)
    if (storedEmail) setValue('email', storedEmail)
    if (storedPassword) setValue('password', storedPassword)
  }, [setValue])

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <p className={styles.title}>Account information</p>
      <p className={styles.titled}>You can edit the Name and Password</p>

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
              onChange={handleChange}
              className={!editing || loading ? styles.disabledInput : null}
              type='text'
              placeholder='Name'
              autoComplete='name'
              disabled={!editing || loading}
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
              className={styles.disabledInput}
              type='text'
              placeholder='Email'
              autoComplete='email'
              disabled
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
                  message: 'Max length 8',
                },
                maxLength: {
                  value: 16,
                  message: 'Max length 16',
                },
              })}
              onChange={handleChange}
              className={!editing || loading ? styles.disabledInput : null}
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              autoComplete='new-password'
              disabled={!editing || loading}
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

          <div className={styles.buttons}>
            {editing && (
              <button
                disabled={loading}
                className={`${styles.save} ${
                  loading ? styles.isLoadingSave : ''
                }`}
                type='submit'
              >
                {loading ? (
                  <l-quantum size='15' speed='1.75' color='#e7e7e7'></l-quantum>
                ) : (
                  <IoCheckmark />
                )}
              </button>
            )}
            {!editing && (
              <button className={styles.edit} onClick={isEditing}>
                <CiEdit />
              </button>
            )}
            {editing && (
              <button
                disabled={loading}
                className={`${styles.cancel} ${
                  loading ? styles.isLoadingCancel : ''
                }`}
                onClick={cancelEditing}
              >
                <IoClose />
              </button>
            )}
          </div>
        </form>
      </div>
      <LogoutButton />
    </div>
  )
}
