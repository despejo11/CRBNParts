import styles from './RecommendedProducts.module.scss'
import { Products } from '../../Products'
import { ThemeContext } from '../../../../../app/providers/ThemeProvider'

import { useParams, Link } from 'react-router-dom'
import { useContext } from 'react'

import { IoIosEye } from 'react-icons/io'
import { FaCartPlus } from 'react-icons/fa'

export default function RecommendedProduct() {
  const [theme] = useContext(ThemeContext)

  const { id } = useParams()
  const product = Products.find((p) => p.id === Number(id))

  const getRandomProducts = () => {
    const productList = [...Products]
    const filteredList = productList.filter((item) => item.id !== product.id)

    const randomProducts = []
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * filteredList.length)
      randomProducts.push(filteredList[randomIndex])
      filteredList.splice(randomIndex, 1)
    }
    return randomProducts
  }

  const recommendedProducts = getRandomProducts()

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <p className={styles.titleRecommended}>Interesting offers</p>
      <p className={styles.titledRecommended}>Buy before they run out!</p>
      <div className={styles.flex}>
        {recommendedProducts.map((recommendedProduct) => (
          <div className={styles.product} key={recommendedProduct.id}>
            <div className={styles.border}></div>
            <Link to={`/shop/${recommendedProduct.id}`}>
              <img
                src={recommendedProduct.firstImage}
                alt={recommendedProduct.alt}
              />
            </Link>
            <p className={styles.makeModel}>
              {recommendedProduct.make} <span>{recommendedProduct.model}</span>
            </p>
            <p className={styles.productType}>
              {recommendedProduct.productType}
            </p>
            <p className={styles.price}>€ {recommendedProduct.price}</p>

            <div className={styles.buttons}>
              <Link to={`/shop/${recommendedProduct.id}`}>
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
  )
}
