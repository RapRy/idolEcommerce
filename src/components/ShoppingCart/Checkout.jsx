import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { removeAllFromCart } from '../../globalFunctions/Cart'

const Checkout = () => {
    const [subTotal, setSubTotal] = useState(0)

    const { cart } = useSelector(state => state.data)
    const dispatch = useDispatch()

    useEffect(() => {
        // calculate total price
        const total = cart.items.map((prod) => prod.price * prod.quantity)
        // update local state subTotal
        setSubTotal(_.sum(total))
    }, [cart.count]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="bg-white shadow-md rounded-xl p-5 lg:p-10 mb-5 lg:mb-24 grid grid-cols-2 lg:grid-cols-customGrid gap-5 items-center">
            <div>
                <button onClick={() => removeAllFromCart(dispatch)} className="inline-block rounded-lg w-28 lg:w-36 bg-red-500 text-center py-2 lg:py-3 font-ubuntu text-white font-bold text-sm lg:text-base">Remove All</button>
            </div>
            <div className="justify-self-end lg:justify-self-center lg:px-10">
                <span className="block text-right text-xs lg:text-sm font-ubuntu text-gray-800">SubTotal:</span>
                <span className="block text-right text-2xl lg:text-3xl font-ubuntu font-bold text-blue-900">{`$ ${subTotal.toFixed(2)}`}</span>
            </div>
            <div className="col-end-3 col-start-1 lg:col-start-3 lg:col-end-4">
                <Link to="/checkout" className="inline-block rounded-lg w-full bg-blue-900 text-center py-2 lg:py-3 lg:px-8 font-ubuntu text-white font-bold text-sm lg:text-base">Checkout</Link>
            </div>
        </div>
    )
}

export default Checkout
