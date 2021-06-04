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
const SignIn = lazy(() => import('./components/User/SignIn'))
const Register = lazy(() => import('./components/User/Register'))
const ForgotPassword = lazy(() => import('./components/User/ForgotPassword'))
const FourOFour = lazy(() => import('./components/FourOFour'))

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
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/password/forgot" component={ForgotPassword} />
            <Route path="*" component={FourOFour} />
          </Switch>
        </Suspense>

        <Footer />
      </div>
    </Router>
  )
}

export default App
