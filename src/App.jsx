import ThemeProvider from '../app/providers/ThemeProvider'
import AppRouter from '../app/router/AppRouter'

export default function App() {
  return (
    <>
      <p className='screen-width-warning'>Only for devices wider than 320px!</p>
      <div className='screen-content'>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </div>
    </>
  )
}
