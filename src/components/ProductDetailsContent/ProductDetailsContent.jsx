import styles from './ProductDetailsContent.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { products } from './Products'

import { useState, useContext, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'

import { FaApple, FaCartPlus } from 'react-icons/fa'
import {
  IoCheckmark,
  IoClose,
  IoArrowBackOutline,
  IoArrowForwardOutline,
} from 'react-icons/io5'
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi'
import { FcGoogle } from 'react-icons/fc'

import gsap from 'gsap'

export default function ProductDetailsContent() {
  const [theme] = useContext(ThemeContext)

  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))

  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const animImage = useRef()

  const changeImage = (newIndex) => {
    if (newIndex !== activeImageIndex) {
      gsap.to(animImage.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setActiveImageIndex(newIndex)
          gsap.to(animImage.current, {
            opacity: 1,
            duration: 0.3,
          })
        },
      })
    }
  }

  const images = [
    product.firstImage,
    product.secondImage,
    product.thirdImage,
    product.fourthImage,
  ]

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <div className='container'>
        <Link className={styles.backToShop} to='/shop'>
          <IoArrowBackOutline />
        </Link>

        <div className={styles.flex}>
          <div className={styles.images}>
            <img
              ref={animImage}
              className={styles.activeImage}
              src={images[activeImageIndex]}
              alt={product.alt}
            />
            <button
              className={`${styles.prev} ${
                activeImageIndex === 0 ? styles.disabled : ''
              }`}
              onClick={() => changeImage(activeImageIndex - 1)}
              disabled={activeImageIndex === 0}
            >
              <IoArrowBackOutline />
            </button>
            <button
              className={`${styles.next} ${
                activeImageIndex === images.length - 1 ? styles.disabled : ''
              }`}
              onClick={() => changeImage(activeImageIndex + 1)}
              disabled={activeImageIndex === images.length - 1}
            >
              <IoArrowForwardOutline />
            </button>

            <div className={styles.imageRow}>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.alt}
                  onClick={() => changeImage(index)}
                  className={
                    activeImageIndex === index ? styles.activeImageRow : ''
                  }
                />
              ))}
            </div>
          </div>

          <div className={styles.flex__content}>
            <p className={styles.makeModel}>
              {product.make} <span>{product.model}</span>
            </p>
            <p className={styles.productType}>{product.productType}</p>
            {product.availability === 'Available' ? (
              <p className={styles.available}>
                <IoCheckmark /> Available
              </p>
            ) : (
              <p className={styles.notAvailable}>
                <IoClose /> Not available
              </p>
            )}
            <p className={styles.price}>€ {product.price}</p>

            {product.availability === 'Available' && (
              <>
                <div className={styles.buttons}>
                  <div className={styles.quantity}>
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                      <HiOutlineMinusSm />
                    </button>
                    <p>{quantity}</p>
                    <button
                      onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                    >
                      <HiOutlinePlusSm />
                    </button>
                  </div>
                  <button className={styles.addToCart}>
                    <FaCartPlus />
                  </button>
                </div>
                <p className={styles.totalPrice}>
                  Total price: <span>€ {product.price * quantity}</span>
                </p>
                <div className={styles.buyButtons}>
                  <button className={styles.google}>
                    Buy with
                    <FcGoogle />
                    Pay
                  </button>
                  <button className={styles.apple}>
                    Buy with
                    <FaApple />
                    Pay
                  </button>
                </div>
              </>
            )}

            <div className={styles.info}>
              <p>
                For models:{' '}
                <span>
                  {product.startYear} - {product.endYear}
                </span>
              </p>
              <p>
                Categories: <span>{product.categories}</span>
              </p>
              <p>
                Brand: <span>{product.brand}</span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.aboutProduct}>
          <div className={styles.aboutProduct__content}>
            <p className={styles.title}>{product.alt}</p>
            <p className={styles.description}>{product.description}</p>
          </div>
          <div className={styles.aboutProduct__content}>
            <p className={styles.title}>Specifications</p>
            <p className={styles.description}>{product.specifications}</p>
          </div>
          <div className={styles.aboutProduct__content}>
            <p className={styles.title}>Installation</p>
            <p className={styles.description}>{product.installation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}