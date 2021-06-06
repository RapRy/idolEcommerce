import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/outline'

import Item from './Item'
import Checkout from './Checkout'
import OtherProducts from '../Products/OtherProducts'
import EmptyCart from '../../images/empty_cart.png'

const ShoppingCart = () => {
    const { cart } = useSelector(state => state.data)
    const { isMobile } = useSelector(state => state.nav)

    return (
        <div className="py-3 lg:py-14 px-5 bg-gray-100">
            <div className="max-w-screen-xl mx-auto">
                {
                    isMobile === false ?
                        <div className="mb-14 ml-10 ">
                            <Link className="inline-block font-ubuntu font-medium text-base text-yellow-500 hover:underline" to="/">Home</Link>
                            <ChevronRightIcon className="inline-block w-6 h-6 text-gray-500" />
                            <span className="inline-block font-ubuntu font-normal text-base text-gray-500">Shopping Cart</span>
                        </div>  
                        :
                        <h1 className="font-ubuntu text-lg font-medium text-gray-500 mb-4 lg:mb-8">Shopping Cart</h1>
                }
                {
                    cart.items.length > 0 ?
                        <>
                            <div className="grid grid-cols-customGrid2 lg:grid-cols-6 lg:place-items-center gap-20 lg:gap-5 bg-white shadow-md rounded-xl px-5 lg:px-10 py-3 lg:py-6 mb-5 lg:mb-8">
                                <span className="text-sm lg:text-base font-medium font-ubuntu text-gray-700 ml-5 lg:ml-0 lg:col-end-3 lg:col-start-1">{ cart.count > 1 ? "Items" : "Item" }</span>
                                { isMobile === false && <span className="text-sm lg:text-base font-medium font-ubuntu text-gray-700 ">Item Price</span> }
                                { isMobile === false && <span className="text-sm lg:text-base font-medium font-ubuntu text-gray-700 ">Quantity</span> }
                                <span className="text-sm lg:text-base font-medium font-ubuntu text-gray-700 ">Total Price</span>
                                { isMobile === false && <span className="text-sm lg:text-base font-medium font-ubuntu text-gray-700 ">Actions</span> }
                            </div>
                            <div>
                                {
                                    cart.items &&
                                        cart.items.map((prod) => (
                                            <Item key={prod.id} prod={prod} />
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
        </div>
    )
}

export default ShoppingCart
