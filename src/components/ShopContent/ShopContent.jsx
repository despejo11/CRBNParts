import styles from './ShopContent.module.scss'
import FilterProducts from './components/FilterProducts/FilterProducts'
import Popup from '../Popup/Popup'
import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { Products } from '../ProductDetailsContent/Products'
import { addItem, removeItem } from '../../features/cart/cartSlice'

import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { IoIosEye } from 'react-icons/io'
import { FaCartPlus } from 'react-icons/fa'
import { BsDoorOpen } from 'react-icons/bs'
import { IoCheckmark, IoClose } from 'react-icons/io5'

import { quantum } from 'ldrs'
quantum.register()

export default function ShopContent() {
  const [theme] = useContext(ThemeContext)

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const isRegistered = useSelector((state) => state.user.isRegistered)
  const cartItems = useSelector((state) => state.cart.items)

  const [visibleProducts, setVisibleProducts] = useState(9)
  const [loading, setLoading] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(Products)
  const [filterMessage, setFilterMessage] = useState('')
  const [loadingAdded, setLoadingAdded] = useState({})
  const [loadingRemove, setLoadingRemove] = useState({})

  const loadMoreProducts = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 9)
    }, 2000)
  }

  const dispatch = useDispatch()

  const handleAddToCart = (product) => {
    setLoadingAdded((prevState) => ({ ...prevState, [product.id]: true }))

    if (!isLoggedIn) {
      setOpenPopup(true)
      setLoadingAdded((prevState) => ({ ...prevState, [product.id]: false }))
      return
    }

    setTimeout(() => {
      setLoadingAdded((prevState) => ({ ...prevState, [product.id]: false }))

      const cartItem = {
        id: product.id,
        make: product.make,
        model: product.model,
        price: product.price,
        quantity: 1,
        image: product.firstImage,
        alt: product.alt,
        productType: product.productType,
        availability: product.availability,
      }

      dispatch(addItem(cartItem))
    }, 2000)
  }

  const handleRemoveFromCart = (productId) => {
    setLoadingRemove((prevState) => ({ ...prevState, [productId]: true }))

    setTimeout(() => {
      dispatch(removeItem({ id: productId }))
      setLoadingRemove((prevState) => ({ ...prevState, [productId]: false }))
    }, 2000)
  }

  const isProductAdded = (productId) => {
    return cartItems.some((item) => item.id === productId)
  }

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <div className='container'>
        <FilterProducts
          products={Products}
          setFilteredProducts={setFilteredProducts}
          setFilterMessage={setFilterMessage}
        />

        {filterMessage && Products.length !== 0 && (
          <p className={styles.nothingFound}>{filterMessage}</p>
        )}

        {Products.length === 0 ? (
          <p className={styles.nothingFound}>No products available.</p>
        ) : (
          <div className={styles.products}>
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <div className={styles.product} key={product.id}>
                <div className={styles.border}></div>
                <Link to={`/shop/${product.id}`}>
                  <img src={product.firstImage} alt={product.alt} />
                </Link>

                <p className={styles.makeModel}>
                  {product.make} <span>{product.model}</span>
                </p>
                <p className={styles.productType}>{product.productType}</p>
                <p className={styles.price}>€ {product.price}</p>

                <div className={styles.buttons}>
                  <Link to={`/shop/${product.id}`}>
                    <button className={styles.view}>
                      <IoIosEye />
                    </button>
                  </Link>

                  {product.availability === 'Available' && (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`${styles.addToCart} ${
                        (isProductAdded(product.id) && isLoggedIn) ||
                        loadingAdded[product.id]
                          ? styles.added
                          : ''
                      }`}
                      disabled={
                        (isProductAdded(product.id) && isLoggedIn) ||
                        loadingAdded[product.id]
                      }
                    >
                      {isProductAdded(product.id) && isLoggedIn ? (
                        <IoCheckmark />
                      ) : loadingAdded[product.id] ? (
                        <l-quantum
                          size='15'
                          speed='1.75'
                          color='#e7e7e7'
                        ></l-quantum>
                      ) : (
                        <FaCartPlus />
                      )}
                    </button>
                  )}

                  {isProductAdded(product.id) && isLoggedIn && (
                    <button
                      onClick={() => handleRemoveFromCart(product.id)}
                      className={`${styles.removeFromCart} ${
                        loadingRemove[product.id] ? styles.added : ''
                      }`}
                      disabled={loadingRemove[product.id]}
                    >
                      {loadingRemove[product.id] ? (
                        <l-quantum
                          size='15'
                          speed='1.75'
                          color='#e7e7e7'
                        ></l-quantum>
                      ) : (
                        <IoClose />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length > visibleProducts && (
          <button
            className={`${styles.loadMoreButton} ${
              loading ? styles.isLoadingBtn : ''
            }`}
            onClick={loadMoreProducts}
            disabled={loading}
          >
            {loading ? (
              <l-quantum size='15' speed='1.75' color='#e7e7e7'></l-quantum>
            ) : (
              'Load More'
            )}
          </button>
        )}
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
