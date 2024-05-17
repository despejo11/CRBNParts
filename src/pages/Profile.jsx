import Header from '../components/Header/Header'
import Location from '../components/Location/Location'
import ProfileContent from '../components/ProfileContent/ProfileContent'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Location>Profile</Location>
      <ProfileContent />
      <Footer />
    </>
  )
}
