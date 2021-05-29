import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'

import './styles.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Store from './components/Store/Store'
import ProductView from './components/Products/ProductDetails'
import Footer from './components/Footer/Footer'

const App = () => {

  return (
    <Router>
      <div>
        <ReactNotification />
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/page/:pageNumber" component={Home} />
          <Route exact path="/store/:category" component={Store} />
          <Route exact path="/store/:category/item/:id" component={ProductView} />
        </Switch>

        <Footer />
      </div>
    </Router>
  )
}

export default App
