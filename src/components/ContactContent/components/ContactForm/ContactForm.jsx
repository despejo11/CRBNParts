import styles from './ContactForm.module.scss'
import useLocalStorage from '../../../../../app/hooks/useLocalStorage'
import Popup from '../../../Popup/Popup'
import { ThemeContext } from '../../../../../app/providers/ThemeProvider'

import { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { PiWarningCircleLight } from 'react-icons/pi'
import { IoCheckmark } from 'react-icons/io5'

import { quantum } from 'ldrs'
quantum.register()

export default function ContactForm() {
  const [theme] = useContext(ThemeContext)

  const [loading, setLoading] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [showText, setShowText] = useState(false)
  const [formSubmitted, setFormSubmitted] = useLocalStorage('Contacted', 'no')
  const [contactName, setContactName] = useLocalStorage('ContactName', '')
  const [contactEmail, setContactEmail] = useLocalStorage('ContactEmail', '')
  const [contactTelephone, setContactTelephone] = useLocalStorage(
    'ContactTelephone',
    ''
  )
  const [contactVehicle, setContactVehicle] = useLocalStorage(
    'ContactVehicle',
    ''
  )
  const [contactMessage, setContactMessage] = useLocalStorage(
    'ContactMessage',
    ''
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    setLoading(true)
    setContactName(data.name)
    setContactEmail(data.email)
    setContactTelephone(data.telephone)
    setContactVehicle(data.vehicle)
    setContactMessage(data.message)
    reset()
    setTimeout(() => {
      setLoading(false)
      setShowText(true)
      setOpenPopup(true)
    }, 4000)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setFormSubmitted('yes')
    }
  }, [isSubmitSuccessful])

  return (
    <div className={styles.content}>
      <div className={styles.content__form}>
        <img src='images/other/Contact.png' alt='Carbon Fiber Figure' />
        <form
          id='form'
          className={theme === 'dark' ? styles.darkForm : ''}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <p className={styles.title}>Contact CRBNParts</p>
            <p className={styles.titled}>Enter your data below</p>
          </div>
          <div className={styles.inputs}>
            <div className={styles.flex}>
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
                  disabled={formSubmitted === 'yes'}
                  className={
                    formSubmitted === 'yes' ? styles.submitSuccessfulInput : ''
                  }
                  defaultValue={contactName}
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
                      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      message: 'Invalid',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Max length 100',
                    },
                  })}
                  disabled={formSubmitted === 'yes'}
                  className={
                    formSubmitted === 'yes' ? styles.submitSuccessfulInput : ''
                  }
                  defaultValue={contactEmail}
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
            </div>

            <div className={styles.flex}>
              <div className={styles.input}>
                <input
                  {...register('telephone', {
                    required: 'Required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Invalid',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Max length 10',
                    },
                  })}
                  disabled={formSubmitted === 'yes'}
                  className={
                    formSubmitted === 'yes' ? styles.submitSuccessfulInput : ''
                  }
                  defaultValue={contactTelephone}
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
                  {...register('vehicle', {
                    required: 'Required',
                    pattern: {
                      value: /^[a-zA-Z0-9\s.'-]+$/,
                      message: 'Invalid',
                    },
                    minLength: {
                      value: 4,
                      message: 'Min length 4',
                    },
                    maxLength: {
                      value: 30,
                      message: 'Max length 30',
                    },
                  })}
                  disabled={formSubmitted === 'yes'}
                  className={
                    formSubmitted === 'yes' ? styles.submitSuccessfulInput : ''
                  }
                  defaultValue={contactVehicle}
                  type='text'
                  placeholder='Vehicle'
                  autoComplete='off'
                />
                {errors?.vehicle && (
                  <p className={styles.error}>
                    <PiWarningCircleLight />
                    {errors.vehicle.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.textareaFlex}>
            <div className={styles.textarea}>
              <textarea
                {...register('message', {
                  required: 'Required',
                  minLength: {
                    value: 10,
                    message: 'Min length 10',
                  },
                  maxLength: {
                    value: 450,
                    message: 'Max length 450',
                  },
                })}
                disabled={formSubmitted === 'yes'}
                className={
                  formSubmitted === 'yes' ? styles.submitSuccessfulInput : ''
                }
                defaultValue={contactMessage}
                placeholder='Message'
                name='message'
                id='message'
              ></textarea>
              {errors?.message && (
                <p className={styles.errorTextarea}>
                  <PiWarningCircleLight />
                  {errors.message.message}
                </p>
              )}
            </div>
            <div className={styles.text}>
              <p className={styles.warning}>
                {showText ? 'Thank you!' : 'Please send your real data!'}
              </p>
              <p>
                {showText
                  ? "We'll try to respond to you as soon as possible, but please be reminded that you will not be able to cancel or edit a message you have sent until we have responded to you."
                  : 'Also keep in mind that you will only be able to contact us again after we have responded to you.'}
              </p>
            </div>
          </div>

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
        </form>

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
              <span>{contactName}</span>, we'll try to respond to you as soon as
              possible.
            </p>
          </Popup>
        )}
      </div>
    </div>
  )
}
