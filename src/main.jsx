import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './Layout/AppRouter.jsx'
import { Provider } from 'react-redux'
import store from './pages/store/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
)
