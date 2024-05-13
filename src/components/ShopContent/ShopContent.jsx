import styles from './ShopContent.module.scss'
import FilterProducts from './components/FilterProducts/FilterProducts'
import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { Products } from '../ProductDetailsContent/Products'

import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { IoIosEye } from 'react-icons/io'
import { FaCartPlus } from 'react-icons/fa'

import { quantum } from 'ldrs'
quantum.register()

export default function ShopContent() {
  const [theme] = useContext(ThemeContext)

  const [visibleProducts, setVisibleProducts] = useState(9)
  const [loading, setLoading] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(Products)
  const [filterMessage, setFilterMessage] = useState('')

  const loadMoreProducts = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 9)
    }, 2000)
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

        {filterMessage && (
          <p className={styles.nothingFound}>{filterMessage}</p>
        )}
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
                <button className={styles.addToCart}>
                  <FaCartPlus />
                </button>
              </div>
            </div>
          ))}
        </div>

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
      </div>
    </div>
  )
}
