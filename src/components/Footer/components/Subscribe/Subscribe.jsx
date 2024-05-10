import styles from './Subscribe.module.scss'
import Popup from '../../../Popup/Popup'
import useLocalStorage from '../../../../../app/hooks/useLocalStorage'
import { ThemeContext } from '../../../../../app/providers/ThemeProvider'

import { useForm } from 'react-hook-form'
import { useContext, useState, useEffect } from 'react'

import { IoCheckmark, IoClose } from 'react-icons/io5'
import { PiWarningCircleLight } from 'react-icons/pi'
import { CiEdit } from 'react-icons/ci'

import { quantum } from 'ldrs'
quantum.register()

export default function Subscribe() {
  const [theme] = useContext(ThemeContext)

  const [openPopup, setOpenPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [userEmail, setUserEmail] = useLocalStorage('SubscribeEmail', '')
  const [showEdit, setShowEdit] = useLocalStorage('ShowEditEmail', 'no')
  const [showCancelEdit, setShowCancelEdit] = useLocalStorage(
    'ShowCancelEmail',
    'no'
  )
  const [formSubmitted, setFormSubmitted] = useLocalStorage('Subscribed', 'no')

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    setLoading(true)
    setEditing(false)
    setFormSubmitted('yes')
    setShowCancelEdit('no')
    if (data.email !== userEmail) {
      setTimeout(() => {
        setLoading(false)
        setShowEdit('yes')
        setOpenPopup(true)
      }, 3000)
    } else {
      setLoading(false)
      setShowEdit('yes')
    }
    setUserEmail(data.email)
    reset()
  }

  const [originalEmail, setOriginalEmail] = useState(userEmail)

  const isEditing = () => {
    setOriginalEmail(userEmail)
    setFormSubmitted('no')
    setShowEdit('no')
    setShowCancelEdit('yes')
    setEditing(true)
  }

  useEffect(() => {
    if (editing) {
      setFocus('email')
    }
  }, [editing])

  const cancelEditing = () => {
    setValue('email', originalEmail)
    setFormSubmitted('yes')
    setShowEdit('yes')
    setShowCancelEdit('no')
    setEditing(false)
    reset()
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setFormSubmitted('yes')
    }
  }, [isSubmitSuccessful])

  return (
    <div className={styles.content}>
      <div
        className={`${styles.subscribe} ${
          theme === 'dark' ? styles.darkSubscribe : ''
        }`}
      >
        <div>
          <p>
            Stay in the know with our newsletter subscription! Get the latest
            updates and news.
          </p>
          <p className={styles.notification}>
            If you subscribe, there is a chance to get a 10% discount on your
            next purchase.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              defaultValue={userEmail}
              disabled={formSubmitted === 'yes'}
              className={
                formSubmitted === 'yes' ? styles.submitSuccessfulInput : ''
              }
              type='text'
              placeholder='Enter Your Email'
              autoComplete='email'
            />
            {showEdit === 'yes' && (
              <button className={styles.edit} onClick={isEditing} type='button'>
                <CiEdit />
              </button>
            )}
            {showCancelEdit === 'yes' && (
              <button
                className={styles.cancel}
                onClick={cancelEditing}
                type='button'
              >
                <IoClose />
              </button>
            )}
          </div>
          <div className={styles.submit}>
            <button
              className={
                formSubmitted === 'yes' ? styles.submitSuccessfulBtn : ''
              }
              disabled={formSubmitted === 'yes'}
            >
              {loading ? (
                <l-quantum size='15' speed='1.75' color='#e7e7e7'></l-quantum>
              ) : formSubmitted === 'yes' ? (
                <IoCheckmark />
              ) : (
                'Submit'
              )}
            </button>
            {errors?.email && (
              <p>
                <PiWarningCircleLight />
                {errors.email.message}
              </p>
            )}
          </div>
        </form>
      </div>

      {isSubmitSuccessful && (
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <p
            className={`${styles.popupTitle} ${
              theme === 'dark' ? styles.darkPopupTitle : ''
            }`}
          >
            Thank you!
          </p>
          <br />
          <p
            className={`${styles.popupDescription} ${
              theme === 'dark' ? styles.darkPopupDescription : ''
            }`}
          >
            Now the email you specified (<span>{userEmail}</span>) will receive
            the latest updates and news.
          </p>
        </Popup>
      )}
    </div>
  )
}
