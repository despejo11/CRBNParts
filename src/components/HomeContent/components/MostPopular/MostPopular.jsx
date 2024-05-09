import styles from './MostPopular.module.scss'
import { ThemeContext } from '../../../../../app/providers/ThemeProvider'

import { useContext } from 'react'
import { useState } from 'react'

import { quantum } from 'ldrs'
quantum.register()

export default function MostPopular() {
  const [theme] = useContext(ThemeContext)

  const [activeButton, setActiveButton] = useState('Ferrari')
  const [loading, setLoading] = useState(false)

  const handleOption = (buttonName) => {
    if (buttonName !== activeButton) {
      setLoading(true)
      setActiveButton(buttonName)
      setTimeout(() => {
        setLoading(false)
      }, 700)
    }
  }

  return (
    <div className='container'>
      <div className={styles.content}>
        <div
          className={`${styles.text} ${
            theme === 'dark' ? styles.darkText : ''
          }`}
        >
          <p className={styles.title}>Most popular</p>
          <p className={styles.description}>Make / Model</p>
          <div
            className={`${styles.buttons} ${
              theme === 'dark' ? styles.darkButtons : ''
            }`}
          >
            <button
              className={activeButton === 'Ferrari' ? styles.activeButton : ''}
              onClick={() => handleOption('Ferrari')}
            >
              Ferrari
            </button>
            <p>│</p>
            <button
              className={activeButton === 'Porsche' ? styles.activeButton : ''}
              onClick={() => handleOption('Porsche')}
            >
              Porsche
            </button>
            <p>│</p>
            <button
              className={
                activeButton === 'Lamborghini' ? styles.activeButton : ''
              }
              onClick={() => handleOption('Lamborghini')}
            >
              Lamborghini
            </button>
            <p>│</p>
            <button
              className={activeButton === 'Other' ? styles.activeButton : ''}
              onClick={() => handleOption('Other')}
            >
              Other
            </button>
          </div>
        </div>

        <div className={styles.selected}>
          {loading ? (
            <div className={styles.loading}>
              <l-quantum
                size='55'
                speed='1.75'
                color={theme === 'dark' ? '#b6b6b6' : '#353535'}
              ></l-quantum>
            </div>
          ) : (
            <>
              {activeButton === 'Ferrari' ? (
                <div className={styles.selected__content}>
                  <div className={theme === 'dark' ? styles.dark : ''}>
                    <img
                      className={styles.image1br}
                      src='images/cars/Ferrari812Superfast.png'
                      alt='Ferrari 812 Superfast'
                    />
                    <p>
                      Ferrari{' '}
                      <span className={styles.model}>812 Superfast</span>
                    </p>
                    <button>Shop Now</button>
                  </div>
                  <div className={theme === 'dark' ? styles.dark : ''}>
                    <img
                      className={styles.image2br}
                      src='images/cars/FerrariSF90Stradale.png'
                      alt='Ferrari SF90 Stradale'
                    />
                    <p>
                      Ferrari{' '}
                      <span className={styles.model}>SF90 Stradale</span>
                    </p>
                    <button>Shop Now</button>
                  </div>
                  <div className={theme === 'dark' ? styles.dark : ''}>
                    <img
                      className={styles.image3br}
                      src='images/cars/Ferrari488Pista.png'
                      alt='Ferrari 488 Pista'
                    />
                    <p>
                      Ferrari <span className={styles.model}>488 Pista</span>
                    </p>
                    <button>Shop Now</button>
                  </div>
                </div>
              ) : null}
              {activeButton === 'Porsche' ? (
                <div className={styles.selected__content}>
                  <div className={theme === 'dark' ? styles.dark : ''}>
                    <img
                      className={styles.image1br}
                      src='images/cars/Porsche911GT3RS.png'
                      alt='Porsche 911 GT3 RS'
                    />
                    <p>
                      Porsche <span className={styles.model}>911 GT3 RS</span>
                    </p>
                    <button>Shop Now</button>
                  </div>
                  <div className={theme === 'dark' ? styles.dark : ''}>
                    <img
                      className={styles.image2br}
                      src='images/cars/PorscheTaycanTurboS.png'
                      alt='Porsche Taycan Turbo S'
                    />
                    <p>
                      Porsche{' '}
                      <span className={styles.model}>Taycan Turbo S</span>
                    </p>
                    <button>Shop Now</button>
                  </div>
                  <div className={theme === 'dark' ? styles.dark : ''}>
                    <img
                      className={styles.image3br}
                      src='images/cars/Porsche911TurboS.png'
                      alt='Porsche 911 Turbo S'
                    />
                    <p>
                      Porsche <span className={styles.model}>911 Turbo S</span>
                    </p>
                    <button>Shop Now</button>
                  </div>
                </div>
              ) : null}
              {activeButton === 'Lamborghini' ? (
                <div className={styles.selected__content}>
                  <div className={theme === 'dark' ? styles.dark : ''}>
                    <img
                      className={styles.image2br}
                      src='images/cars/LamborghiniAventadorSVJ.png'
                      alt='Lamborghini Aventador SVJ'
                    />
                    <p>
                      Lamborghini{' '}
                      <span className={styles.model}>Aventador SVJ</span>
                    </p>
                    <button>Shop Now</button>
                  </div>
                  <div className={theme === 'dark' ? styles.dark : ''}>
                    <img
                      className={styles.image1br}
                      src='images/cars/LamborghiniUrus.png'
                      alt='Lamborghini Urus'
                    />
                    <p>
                      Lamborghini <span className={styles.model}>Urus</span>
                    </p>
                    <button>Shop Now</button>
                  </div>
                  <div className={theme === 'dark' ? styles.dark : ''}>
                    <img
                      className={styles.image3br}
                      src='images/cars/LamborghiniHuracanSTO.png'
                      alt='Lamborghini Huracan STO'
                    />
                    <p>
                      Lamborghini{' '}
                      <span className={styles.model}>Huracan STO</span>
                    </p>
                    <button>Shop Now</button>
                  </div>
                </div>
              ) : null}
              {activeButton === 'Other' ? (
                <div className={styles.selected__content}>
                  <div className={theme === 'dark' ? styles.dark : ''}>
                    <img
                      className={styles.image1br}
                      src='images/cars/McLaren765LT.png'
                      alt='McLaren 765LT'
                    />
                    <p>
                      McLaren <span className={styles.model}>765LT</span>
                    </p>
                    <button>Shop Now</button>
                  </div>
                  <div className={theme === 'dark' ? styles.dark : ''}>
                    <img
                      className={styles.image2br}
                      src='images/cars/MercedesBenzE63S.png'
                      alt='Mercedes-Benz E63 S'
                    />
                    <p>
                      Mercedes-Benz{' '}
                      <span className={styles.model}>E63S AMG</span>
                    </p>
                    <button>Shop Now</button>
                  </div>
                  <div className={theme === 'dark' ? styles.dark : ''}>
                    <img
                      className={styles.image3br}
                      src='images/cars/BMWM8Competition.png'
                      alt='BMW M8 Competition'
                    />
                    <p>
                      BMW <span className={styles.model}>M8 Competition</span>
                    </p>
                    <button>Shop Now</button>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
