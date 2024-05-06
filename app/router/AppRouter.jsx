import NewPage from './NewPage'
import Home from '../../src/pages/Home'
import Testimonials from '../../src/pages/Testimonials'
import Error from '../../src/pages/Error'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function AppRouter() {
  return (
    <Router>
      <NewPage />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}
