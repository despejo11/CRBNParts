import styles from './TestimonialsContent.module.scss'
import TestimonialsForm from './components/TestimonialsForm'
import { ThemeContext } from '../../../app/providers/ThemeProvider'

import { useContext } from 'react'

export default function TestimonialsContent() {
  const [theme] = useContext(ThemeContext)

  return (
    <div className='container'>
      <div className={styles.content}>
        <div
          className={`${styles.content__text} ${
            theme === 'dark' ? styles.content__darkText : ''
          }`}
        >
          <p className={styles.title}>Client's testimonials</p>
          <p className={styles.description}>
            Discover the positive impact we’ve had on our clients by reading
            their testimonials. Our clients have experienced our services, and
            they are eager to share their positive experiences with you.
          </p>
        </div>

        <div className={styles.content__testimonials}>
          <div
            className={`${styles.testimonial} ${
              theme === 'dark' ? styles.darkTestimonial : ''
            }`}
          >
            <div>
              <p className={styles.name}>Jose Rodriguez</p>
              <p className={styles.description}>
                "I’ve been a car enthusiast for years and have always been on
                the lookout for quality carbon parts. This shop exceeded my
                expectations. The carbon parts I purchased were not only
                lightweight but also incredibly durable. They fit my car like a
                glove and have noticeably improved its performance. I’m
                thoroughly impressed and will definitely be a returning
                customer."
              </p>
            </div>
            <p className={styles.date}>3 May, 2024</p>
          </div>
          <div
            className={`${styles.testimonial} ${
              theme === 'dark' ? styles.darkTestimonial : ''
            }`}
          >
            <div>
              <p className={styles.name}>Miguel Hernandez</p>
              <p className={styles.description}>
                "I can recommend this shop enough. The carbon parts I bought are
                of superior quality and have given my car a sleek, professional
                look. The staff was also very helpful, providing excellent
                customer service. They took the time to understand my needs and
                recommended the perfect parts for my car. I couldn’t be happier
                with my purchase."
              </p>
            </div>
            <p className={styles.date}>11 Apr, 2024</p>
          </div>
          <div
            className={`${styles.testimonial} ${
              theme === 'dark' ? styles.darkTestimonial : ''
            }`}
          >
            <div>
              <p className={styles.name}>Antonio Martinez</p>
              <p className={styles.description}>
                "This shop is a gem for car enthusiasts. The carbon parts I
                purchased are top-notch, lightweight, and durable. They have
                significantly enhanced my car’s performance. The staff is
                knowledgeable and friendly, making the shopping experience
                enjoyable. I highly recommend this shop to anyone in need of
                high-quality carbon car parts."
              </p>
            </div>
            <p className={styles.date}>6 May, 2024</p>
          </div>
          <div
            className={`${styles.testimonial} ${
              theme === 'dark' ? styles.darkTestimonial : ''
            }`}
          >
            <div>
              <p className={styles.name}>Juan Lopez</p>
              <p className={styles.description}>
                "I recently bought carbon parts for my car from this shop and I
                must say, I’m extremely satisfied. The parts are of excellent
                quality and have greatly improved my car’s performance. The
                staff was very helpful and guided me through the entire process.
                I will definitely be coming back for more."
              </p>
            </div>
            <p className={styles.date}>9 Mar, 2024</p>
          </div>
          <div
            className={`${styles.testimonial} ${
              theme === 'dark' ? styles.darkTestimonial : ''
            }`}
          >
            <div>
              <p className={styles.name}>Carlos Sanchez</p>
              <p className={styles.description}>
                "I’m really impressed with the quality of the carbon parts I
                bought from this shop. They’re lightweight, durable, and fit my
                car perfectly. The staff was very knowledgeable and helped me
                choose the right parts for my car. I’ve noticed a significant
                improvement in my car’s performance since installing these
                parts."
              </p>
            </div>
            <p className={styles.date}>23 Apr, 2024</p>
          </div>
          <div
            className={`${styles.testimonial} ${
              theme === 'dark' ? styles.darkTestimonial : ''
            }`}
          >
            <div>
              <p className={styles.name}>Rafael Perez</p>
              <p className={styles.description}>
                "I am absolutely thrilled with my purchase from this shop. The
                carbon parts I bought are of exceptional quality, lightweight
                yet incredibly durable. They have given my car a noticeable
                boost in performance and a sleek, professional look. The staff
                at the shop were extremely knowledgeable and helpful, guiding me
                through the selection process and ensuring I chose the parts
                that were best suited for my car."
              </p>
            </div>
            <p className={styles.date}>21 Mar, 2024</p>
          </div>
        </div>
        <TestimonialsForm />
      </div>
    </div>
  )
}
