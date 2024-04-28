import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '../../src/pages/Home'
import Error from '../../src/pages/Error'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}
