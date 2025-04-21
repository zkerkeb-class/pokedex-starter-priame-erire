import Home from './config/screens/Home'
import { RouterProvider } from 'react-router'
import router from './config/router'
const App = () => {
  return (
  <RouterProvider router={router} />
  )
}
export default App