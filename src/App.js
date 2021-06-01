import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'

import './styles.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const Home = lazy(() => import('./components/Home/Home'))
const Store = lazy(() => import('./components/Store/Store'))
const ProductView = lazy(() => import('./components/Products/ProductDetails'))
const ShoppingCart = lazy(() => import('./components/ShoppingCart/ShoppingCart'))

const App = () => {

  return (
    <Router>
      <div>
        <ReactNotification />
        <Header />

        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/page/:pageNumber" component={Home} />
            <Route exact path="/store/:category" component={Store} />
            <Route exact path="/store/:category/item/:id" component={ProductView} />
            <Route exact path="/cart" component={ShoppingCart} />
          </Switch>
        </Suspense>

        <Footer />
      </div>
    </Router>
  )
}

export default App
