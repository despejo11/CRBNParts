import NewPage from './NewPage'
import Home from '../../src/pages/Home'
import Error from '../../src/pages/Error'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function AppRouter() {
  return (
    <Router>
      <NewPage />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}
