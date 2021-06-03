import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


import Item from './Item'
import Checkout from './Checkout'
import OtherProducts from '../Products/OtherProducts'
import EmptyCart from '../../images/empty_cart.png'

const ShoppingCart = () => {
    const { cart } = useSelector(state => state.data)
    const { isMobile } = useSelector(state => state.nav)

    return (
        <div className="py-3 px-5 bg-gray-100">
            <h1 className="font-ubuntu text-lg font-medium text-gray-500 mb-4">Shopping Cart</h1>
            {
                cart.items.length > 0 ?
                    <>
                        <div className="grid grid-cols-customGrid2 lg:grid-cols-6 lg:place-items-center gap-20 lg:gap-5 bg-white shadow-md rounded-xl px-5 py-3 mb-5">
                            <span className="text-sm font-ubuntu text-gray-800 ml-5 lg:ml-0 lg:col-end-3 lg:col-start-1">{ cart.count > 1 ? "Items" : "Item" }</span>
                            { isMobile === false && <span className="text-sm font-ubuntu text-gray-800 ">Item Price</span> }
                            { isMobile === false && <span className="text-sm font-ubuntu text-gray-800 ">Quantity</span> }
                            <span className="text-sm font-ubuntu text-gray-800 ">Total Price</span>
                            { isMobile === false && <span className="text-sm font-ubuntu text-gray-800 ">Actions</span> }
                        </div>
                        <div>
                            {
                                cart.items &&
                                    cart.items.map((prod) => (
                                        <Item key={prod.id} prod={prod} cart={cart} />
                                    ))
                            }
                        </div>
                        <Checkout />
                    </>
                :
                    <div className="text-center">
                        <p className="font-ubuntu text-base font-bold text-gray-700">Your shopping cart is empty</p>
                        <img className="mx-auto" src={EmptyCart} alt="Empty Cart" />
                        <Link to="/" className="inline-block rounded-lg w-28 bg-blue-600 py-3 font-ubuntu text-white font-bold text-base mb-10 mt-5">Shop Now</Link>
                    </div>
            }
            <OtherProducts />
        </div>
    )
}

export default ShoppingCart
