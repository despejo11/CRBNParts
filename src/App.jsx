import ThemeProvider from '../app/providers/ThemeProvider'
import AppRouter from '../app/router/AppRouter'

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  )
}
