import NewPage from './NewPage'
import Home from '../../src/pages/Home'
import SignUp from '../../src/pages/SignUp'
import SignIn from '../../src/pages/SignIn'
import Testimonials from '../../src/pages/Testimonials'
import About from '../../src/pages/About'
import Team from '../../src/pages/Team'
import Contact from '../../src/pages/Contact'
import Shop from '../../src/pages/Shop'
import ProductDetails from '../../src/pages/ProductDetails'
import Profile from '../../src/pages/Profile'
import Cart from '../../src/pages/Cart'
import Thanks from '../../src/pages/Thanks'
import Error from '../../src/pages/Error'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function AppRouter() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  const [hasOrderHistory, setHasOrderHistory] = useState(false)

  useEffect(() => {
    const orderHistory = JSON.parse(localStorage.getItem('OrderHistory')) || []
    setHasOrderHistory(orderHistory.length > 0)
  }, [])

  return (
    <Router>
      <NewPage />
      <Routes>
        <Route path='/' element={<Home />} />
        {!isLoggedIn && <Route path='/signup' element={<SignUp />} />}
        {!isLoggedIn && <Route path='/signin' element={<SignIn />} />}
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path='/about' element={<About />} />
        <Route path='/team' element={<Team />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/:id' element={<ProductDetails />} />
        {isLoggedIn && <Route path='/profile' element={<Profile />} />}
        {isLoggedIn && <Route path='/cart' element={<Cart />} />}
        {hasOrderHistory && isLoggedIn && (
          <Route path='/thanks' element={<Thanks />} />
        )}
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}
