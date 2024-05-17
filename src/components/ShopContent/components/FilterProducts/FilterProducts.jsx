import styles from './FilterProducts.module.scss'
import { ThemeContext } from '../../../../../app/providers/ThemeProvider'

import { useState, useContext } from 'react'
import { IoClose } from 'react-icons/io5'

export default function FilterProducts({
  products,
  setFilteredProducts,
  setFilterMessage,
}) {
  const [theme] = useContext(ThemeContext)

  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedProductType, setSelectedProductType] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedProductCount, setSelectedProductCount] = useState(
    products.length
  )

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value)
    filterProducts(
      selectedBrand,
      event.target.value,
      minPrice,
      maxPrice,
      selectedProductType
    )
  }

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value)
    filterProducts(
      event.target.value,
      selectedModel,
      minPrice,
      maxPrice,
      selectedProductType
    )
  }

  const handleProductTypeChange = (event) => {
    setSelectedProductType(event.target.value)
    filterProducts(
      selectedBrand,
      selectedModel,
      minPrice,
      maxPrice,
      event.target.value
    )
  }

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value)
    filterProducts(
      selectedBrand,
      selectedModel,
      event.target.value,
      maxPrice,
      selectedProductType
    )
  }

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value)
    filterProducts(
      selectedBrand,
      selectedModel,
      minPrice,
      event.target.value,
      selectedProductType
    )
  }

  const filterProducts = (brand, model, minPrice, maxPrice, productType) => {
    let filtered = products

    if (brand) {
      filtered = filtered.filter((product) =>
        product.make.toLowerCase().includes(brand.toLowerCase())
      )
    }
    if (model) {
      filtered = filtered.filter((product) =>
        product.model.toLowerCase().includes(model.toLowerCase())
      )
    }
    if (productType) {
      filtered = filtered.filter((product) =>
        product.productType.toLowerCase().includes(productType.toLowerCase())
      )
    }
    if (minPrice) {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(minPrice)
      )
    }
    if (maxPrice) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(maxPrice)
      )
    }

    setFilteredProducts(filtered)
    setSelectedProductCount(filtered.length)

    if (filtered.length === 0) {
      setFilterMessage('Nothing was found for your request.')
    } else {
      setFilterMessage('')
    }
  }

  const clearFilters = () => {
    setSelectedBrand('')
    setSelectedModel('')
    setSelectedProductType('')
    setMinPrice('')
    setMaxPrice('')
    setFilterMessage('')
    setFilteredProducts(products)
    setSelectedProductCount(0)
  }

  return (
    <div
      className={`${styles.content} ${
        theme === 'dark' ? styles.darkContent : ''
      }`}
    >
      <img src='/images/other/ShopFilterBg.png' alt='Carbon Fiber Figure' />
      <input
        id='selectedBrand'
        type='text'
        value={selectedBrand}
        onChange={handleBrandChange}
        placeholder='Make'
      />
      <input
        id='selectedModel'
        type='text'
        value={selectedModel}
        onChange={handleModelChange}
        placeholder='Model'
      />
      <input
        id='selectedProductType'
        type='text'
        value={selectedProductType}
        onChange={handleProductTypeChange}
        placeholder='Product Type'
      />
      <input
        id='minPrice'
        className={styles.inputPrice}
        type='number'
        value={minPrice}
        onChange={handleMinPriceChange}
        placeholder='Min Price'
      />
      <input
        id='maxPrice'
        className={styles.inputPrice}
        type='number'
        value={maxPrice}
        onChange={handleMaxPriceChange}
        placeholder='Max Price'
      />
      <button onClick={clearFilters}>
        <IoClose />
      </button>
      <p className={styles.selected}>
        Selected products: <span>{selectedProductCount}</span>
      </p>
    </div>
  )
}
