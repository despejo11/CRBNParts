import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function NewPage() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.style.overflow = 'auto'
  }, [pathname])

  return null
}
