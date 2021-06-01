import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeAllFromCart } from '../../globalFunctions/Cart'

import _ from 'lodash'

const Checkout = () => {
    const [subTotal, setSubTotal] = useState(0)
    const { cart } = useSelector(state => state.data)
    const dispatch = useDispatch()

    useEffect(() => {
        const total = cart.items.map((prod) => prod.price * prod.quantity)

        setSubTotal(_.sum(total))
    }, [cart.count])

    return (
        <div className="bg-white shadow-md rounded-xl p-5 mb-5 grid grid-cols-2 gap-5 items-center">
            <div>
                <button onClick={() => removeAllFromCart(dispatch)} className="inline-block rounded-lg w-28 bg-red-500 text-center py-2 font-ubuntu text-white font-bold text-sm">Remove All</button>
            </div>
            <div className="justify-self-end">
                <span className="block text-right text-xs font-ubuntu text-gray-800">SubTotal:</span>
                <span className="block text-right text-2xl font-ubuntu font-bold text-blue-900">{`$ ${subTotal}`}</span>
            </div>
            <div className="col-end-3 col-start-1">
                <Link to="/checkout" className="inline-block rounded-lg w-full bg-blue-900 text-center py-2 font-ubuntu text-white font-bold text-sm">Checkout</Link>
            </div>
        </div>
    )
}

export default Checkout
