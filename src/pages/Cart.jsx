import Header from '../components/Header/Header'
import Location from '../components/Location/Location'
import Footer from '../components/Footer/Footer'
import CartContent from '../components/CartContent/CartContent'

export default function Home() {
  return (
    <>
      <Header />
      <Location>Cart</Location>
      <CartContent />
      <Footer />
    </>
  )
}
