import styles from './TestimonialsForm.module.scss'
import Popup from '../../Popup/Popup'
import useLocalStorage from '../../../../app/hooks/useLocalStorage'
import { ThemeContext } from '../../../../app/providers/ThemeProvider'

import { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { PiWarningCircleLight } from 'react-icons/pi'
import { IoCheckmark } from 'react-icons/io5'

import { quantum } from 'ldrs'
quantum.register()

export default function TestimonialsForm() {
  const [theme] = useContext(ThemeContext)

  const [openPopup, setOpenPopup] = useState()
  const [loading, setLoading] = useState()
  const [showCancel, setShowCancel] = useLocalStorage(
    'ShowCancelTestimonial',
    'no'
  )
  const [userTestimonial, setUserTestimonial] = useLocalStorage(
    'Testimonial',
    ''
  )
  const [leaveTestimonial, setLeaveTestimonial] = useLocalStorage(
    'LeaveTestimonial',
    'no'
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
    reset()
    setLoading(true)
    setUserTestimonial(data.testimonial)
    if (data.testimonial !== userTestimonial) {
      setTimeout(() => {
        setLoading(false)
        setShowCancel('yes')
      }, 2000)
    } else {
      setLoading(false)
      setShowCancel('yes')
    }
  }

  const cancelShipment = () => {
    reset()
    setLeaveTestimonial('no')
    setShowCancel('no')
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setLeaveTestimonial('yes')
    }
  }, [isSubmitSuccessful])

  return (
    <div className={styles.content}>
      <button className={styles.leaveYour} onClick={() => setOpenPopup(true)}>
        Leave Your
      </button>
      {openPopup && (
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <div
            className={`${styles.popup} ${
              theme === 'dark' ? styles.darkPopup : ''
            }`}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                {...register('testimonial', {
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
                defaultValue={userTestimonial}
                disabled={leaveTestimonial === 'yes'}
                className={
                  leaveTestimonial === 'yes'
                    ? styles.submitSuccessfulTextarea
                    : ''
                }
                placeholder='Enter Your Text'
                name='testimonial'
                id='testimonial'
              ></textarea>
              <div>
                <button
                  className={`${styles.send} ${
                    leaveTestimonial === 'yes' ? styles.submitSuccessfulBtn : ''
                  }`}
                  disabled={leaveTestimonial === 'yes'}
                >
                  {loading ? (
                    <l-quantum
                      size='15'
                      speed='1.75'
                      color='#e7e7e7'
                    ></l-quantum>
                  ) : leaveTestimonial === 'yes' ? (
                    <IoCheckmark />
                  ) : (
                    'Send'
                  )}
                </button>
                {showCancel === 'yes' && leaveTestimonial === 'yes' && (
                  <button className={styles.cancel} onClick={cancelShipment}>
                    Cancel
                  </button>
                )}
                {errors?.testimonial && (
                  <p>
                    <PiWarningCircleLight />
                    {errors.testimonial.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </Popup>
      )}
    </div>
  )
}
