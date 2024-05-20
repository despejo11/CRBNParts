import styles from './ProductDetailsContent.module.scss'
import RecommendedProducts from './components/RecommendedProducts/RecommendedProducts'
import Popup from '../Popup/Popup'
import { Products } from './Products'
import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { addItem, removeItem } from '../../features/cart/cartSlice'

import { useState, useContext, useRef, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { FaApple, FaCartPlus } from 'react-icons/fa'
import {
  IoCheckmark,
  IoClose,
  IoArrowBackOutline,
  IoArrowForwardOutline,
} from 'react-icons/io5'
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi'
import { FcGoogle } from 'react-icons/fc'
import { BsDoorOpen } from 'react-icons/bs'

import { quantum } from 'ldrs'
quantum.register()

import gsap from 'gsap'

export default function ProductDetailsContent() {
  const [theme] = useContext(ThemeContext)

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const isRegistered = useSelector((state) => state.user.isRegistered)
  const cartItems = useSelector((state) => state.cart.items)

  const { id } = useParams()
  const product = Products.find((p) => p.id === Number(id))

  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [openPopup, setOpenPopup] = useState()
  const [isAdded, setIsAdded] = useState(false)
  const [loadingAdded, setLoadingAdded] = useState(false)
  const [loadingRemove, setLoadingRemove] = useState(false)

  const animImage = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    setActiveImageIndex(0)
    setQuantity(1)
    setIsAdded(cartItems.some((item) => item.id === Number(id)))
  }, [id, cartItems])

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

  const handleAddToCart = () => {
    if (isLoggedIn) {
      setLoadingAdded(true)

      setTimeout(() => {
        setLoadingAdded(false)

        const cartItem = {
          id: product.id,
          make: product.make,
          model: product.model,
          price: product.price,
          quantity,
          image: images[0],
          alt: product.alt,
          productType: product.productType,
          availability: product.availability,
        }

        dispatch(addItem(cartItem))
        setIsAdded(true)
      }, 2000)
    } else {
      setOpenPopup(true)
    }
  }

  const handleRemoveFromCart = () => {
    setLoadingRemove(true)

    setTimeout(() => {
      setLoadingRemove(false)

      dispatch(removeItem({ id: product.id }))
      setIsAdded(false)
    }, 2000)
  }

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <div className='container'>
        <button className={styles.backToShop} onClick={() => navigate(-1)}>
          <IoArrowBackOutline />
        </button>

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
                  {(!isAdded || !isLoggedIn) && !loadingAdded && (
                    <div className={styles.quantity}>
                      <button
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                        className={quantity === 1 ? styles.added : ''}
                        disabled={quantity === 1}
                      >
                        <HiOutlineMinusSm />
                      </button>
                      <p>{quantity}</p>
                      <button
                        onClick={() =>
                          quantity < 10 && setQuantity(quantity + 1)
                        }
                        className={quantity >= 10 ? styles.added : ''}
                        disabled={quantity >= 10}
                      >
                        <HiOutlinePlusSm />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handleAddToCart}
                    className={`${styles.addToCart} ${
                      (isAdded && isLoggedIn) || loadingAdded
                        ? styles.added
                        : ''
                    }`}
                    disabled={(isAdded && isLoggedIn) || loadingAdded}
                  >
                    {isAdded && isLoggedIn ? (
                      <IoCheckmark />
                    ) : loadingAdded ? (
                      <l-quantum size='17' speed='1.75' color='#e7e7e7' />
                    ) : (
                      <FaCartPlus />
                    )}
                  </button>

                  {isAdded && isLoggedIn && (
                    <button
                      className={`${styles.removeFromCart} ${
                        loadingRemove ? styles.added : ''
                      }`}
                      onClick={handleRemoveFromCart}
                      disabled={loadingRemove}
                    >
                      {loadingRemove ? (
                        <l-quantum size='13' speed='1.75' color='#e7e7e7' />
                      ) : (
                        <IoClose />
                      )}
                    </button>
                  )}
                </div>

                {(!isAdded || !isLoggedIn) &&
                  (!loadingAdded || !isLoggedIn) && (
                    <>
                      <p className={styles.totalPrice}>
                        Total price: <span>€ {product.price * quantity}</span>
                      </p>
                      <div className={styles.buyButtons}>
                        <button
                          onClick={() => {
                            if (!isLoggedIn) {
                              setOpenPopup(true)
                            }
                          }}
                          className={styles.google}
                        >
                          Buy with
                          <FcGoogle />
                          Pay
                        </button>
                        <button
                          onClick={() => {
                            if (!isLoggedIn) {
                              setOpenPopup(true)
                            }
                          }}
                          className={styles.apple}
                        >
                          Buy with
                          <FaApple />
                          Pay
                        </button>
                      </div>
                    </>
                  )}
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

        <RecommendedProducts />

        {openPopup && (
          <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
            <div className={styles.popupContent}>
              <p className={styles.title}>Warning!</p>
              <br />
              <p className={styles.titled}>
                First sign up or sign in to your account
              </p>
              <Link to={isRegistered ? '/signin' : '/signup'}>
                <button>
                  <BsDoorOpen />
                </button>
              </Link>
            </div>
          </Popup>
        )}
      </div>
    </div>
  )
}
