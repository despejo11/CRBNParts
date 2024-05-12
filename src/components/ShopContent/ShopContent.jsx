import styles from './ShopContent.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { products } from '../ProductDetailsContent/Products'

import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { IoIosEye } from 'react-icons/io'
import { FaCartPlus } from 'react-icons/fa'

export default function ShopContent() {
  const [theme] = useContext(ThemeContext)

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <div className='container'>
        <div className={styles.products}>
          {products.map((product) => (
            <div className={styles.product} key={product.id}>
              <img src={product.firstImage} alt={product.alt} />
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
      </div>
    </div>
  )
}
