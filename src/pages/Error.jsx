import Header from '../components/Header/Header'
import Location from '../components/Location/Location'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import Footer from '../components/Footer/Footer'

export default function Error() {
  return (
    <>
      <Header />
      <Location>404</Location>
      <ErrorPage />
      <Footer />
    </>
  )
}
