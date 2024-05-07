import styles from './AboutContent.module.scss'

import { ThemeContext } from '../../../app/providers/ThemeProvider'
import { useContext } from 'react'

export default function AboutContent() {
  const [theme] = useContext(ThemeContext)

  return (
    <div className={styles.content}>
      <div className='container'>
        <div
          className={`${styles.content__text} ${
            theme === 'dark' ? styles.content__darkText : ''
          }`}
        >
          <p className={styles.title}>About CRBNParts</p>
          <p className={styles.description}>
            CRBNParts is one of the leading Spanish companies when it comes to
            custom carbon fiber automotive parts and specialized performance
            parts.
          </p>
        </div>

        <div
          className={`${styles.section} ${
            theme === 'dark' ? styles.darkSection : ''
          }`}
        >
          <p className={styles.title}>The back story</p>
          <p className={styles.titled}>Who are CRBNParts</p>
          <p className={styles.description}>
            Way back in 2009 CRBNParts was founded in a small bedroom and out
            garage in Madrid, where Daniel (the boss man) started dabbling in
            carbon fiber on a project car (the Infamous Audi TT Mk2) in creating
            carbon mirror caps.
          </p>
          <p className={styles.description}>
            Daniel’s interest in carbon fiber however came from his motorsport
            background since 2003. Having raced in Formula 3, Formula 2, Renault
            World, Blancpain Endurance (GT World Challenge) and then ending up
            in the European Le Man Series he was surrounded by carbon fiber not
            only to give him the weight advantage but also the safety aspect.
          </p>
          <p className={styles.description}>
            In 2014 is where it started to get serious with the business
            incorporating and becoming a limited company and since then super
            charging the way forward in the world of carbon fiber.
          </p>
        </div>

        <div
          className={`${styles.section} ${
            theme === 'dark' ? styles.darkSection : ''
          }`}
        >
          <p className={styles.title}>Workshop facilities</p>
          <p className={styles.titled}>Facilities</p>
          <p className={styles.description}>
            Back in 2021 we combined 3 separate locations into one so that our
            offices, stock and workshop facilities were all encompassed and
            housed under one roof. We think we know our products and brands the
            best so we invested heavily into the state-of-the-art installation
            bay within our building so that we can truly offer high quality
            installations.
          </p>
        </div>

        <div
          className={`${styles.section} ${
            theme === 'dark' ? styles.darkSection : ''
          }`}
        >
          <p className={styles.title}>Carbon fiber parts</p>
          <p className={styles.titled}>What can we offer?</p>
          <p className={styles.description}>
            At CRBNParts, we design, develop and manufacture full prepreg carbon
            fiber parts for the automotive world. We have a large selection of
            carbon fiber parts available for purchase on our website, and we
            also fill orders for carbon fiber parts for other companies.
          </p>
        </div>

        <div
          className={`${styles.section} ${
            theme === 'dark' ? styles.darkSection : ''
          }`}
        >
          <p className={styles.title}>Development vehicles</p>
          <p className={styles.titled}>Knowledge is power</p>
          <p className={styles.description}>
            We’re not just a box them high and sell them cheap sort of company
            when it comes to any of our products that we make or buy in. We
            choose a car, buy it as a company asset and then develop and test
            our parts (and our partner brands parts) to that vehicle to make
            sure we’re happy with how they look, fit and ultimately put a smile
            on our face.
          </p>
          <p className={styles.description}>
            How can you sell a product if you really don’t know how it fits,
            looks and whether it’s made to last? The honest answer is you can’t,
            and you shouldn’t! We will never become a company that tries to sell
            customers what ever they can to make a quick buck, we will always
            spend time doing our research and development until we are
            completely satisfied that part is made to do its job properly. If
            it’s not good enough to go on our car, it’s certainly not good
            enough to go on yours.
          </p>
        </div>

        <div
          className={`${styles.section} ${
            theme === 'dark' ? styles.darkSection : ''
          }`}
        >
          <p className={styles.title}>Here at CRBNParts</p>
          <p className={styles.titled}>Gaining status</p>
          <p className={styles.description}>
            We at CRBNParts have always said we're different when it comes to
            carbon fiber products. We pride ourselves on the fact that we don't
            that we don't just import products and send them straight to the
            masses. CRBNParts is more than that, as we offer in-home complete
            fabrication, manufacturing, trimming.
          </p>
          <p className={styles.description}>
            In order to stand out from the rest, we applied to participate in
            the program "Made in Spain" program, which is an accreditation in
            itself, and demonstrates that we manufacture our products right here
            in Spain. The label itself lets our customers to know that we are a
            trusted company that values transparency, sustainability and ethical
            business practices. On the website. there will be some products that
            we still import from outside of Spain for for the various product
            lines we offer, in which case the mark will not be Will not be used
            against them. This is to further emphasize our core value of
            transparency.
          </p>
          <p className={styles.description}>
            As part of the application process we must show/prove to the Made in
            Spain Team that we either manufacture parts entirely in house or
            that other products are substantially modified/transformed at our
            headquarters in Madrid. We are pleased to report that our
            application has been granted and we are now entitled to proudly
            display the "Made in Spain" mark on our website and join over 1200
            other Spanish manufacturers.
          </p>
        </div>
      </div>
    </div>
  )
}
