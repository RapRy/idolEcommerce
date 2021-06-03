import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { quantityCheck, removeItemFromCart } from '../../globalFunctions/Cart'

const availStock = 30

const Item = ({ prod, cart }) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(prod.quantity)
    const { isMobile } = useSelector(state => state.nav)

    useEffect(() => {
        if(prod.quantity !== quantity){
            quantityCheck(prod, availStock, dispatch, cart.items, quantity, setQuantity, 'addQuantityFromCart')
        }
    }, [quantity])

    return (
        <div className="bg-white shadow-md rounded-xl p-5 mb-5 lg:grid lg:grid-cols-6 lg:gap-5">
            <div className="grid grid-cols-customGrid2 lg:grid-cols-5 gap-20 lg:gap-5 lg:col-start-1 lg:col-end-6">
                <div className="lg:col-start-1 lg:col-end-5 lg:grid lg:grid-cols-4 lg:gap-5">
                    <div className="lg:col-start-1 lg:col-end-3 lg:grid lg:grid-cols-2 lg:gap-5">
                        <Link to={`/store/${prod.category.replace(" ", "-")}/item/${prod.id}`}>
                            <img className="mb-4 h-60 lg:w-full lg:h-full lg:mb-0" src={prod.image} alt={prod.title} />
                        </Link>
                        <p className="font-ubuntu text-base font-semibold pb-5 lg:pb-0 text-gray-800 lg:self-center">{prod.title}</p>
                    </div>
                    <p className="font-ubuntu text-xl font-semibold pb-5 lg:pb-0 text-blue-700 lg:justify-self-center lg:self-center">{`$ ${prod.price} `}<span className="text-sm font-ubuntu font-normal text-gray-600">{ isMobile === true && "Item Price" }</span></p>
                    <div className="lg:col-start-4 lg:col-end-5 lg:justify-self-center lg:flex lg:flex-col lg:items-center lg:self-center">
                        <div className="mb-2">
                            <button onClick={() => setQuantity(prevState => parseInt(prevState) - 1)} className="bg-gradient-to-b from-gray-300 to-gray-200 inline-block px-2 py-2 rounded-md border border-gray-400 text-sm mr-2">➖</button>
                            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-10 text-center bg-white inline-block px-3 py-2 rounded-md border shadow-inner text-sm font-ubuntu font-bold text-blue-600" />
                            <button onClick={() => setQuantity(prevState => parseInt(prevState) + 1)} className="bg-gradient-to-b from-gray-300 to-gray-200 inline-block px-2 py-2 rounded-md border border-gray-400 text-sm ml-2 mr-2">➕</button>
                            {
                                isMobile === true &&
                                    <span className="text-sm font-ubuntu font-normal text-gray-600">Quantity</span>
                            }
                        </div>
                        <p className="pb-5 lg:pb-0 font-ubuntu text-sm text-blue-600 font-semibold">{`Available Stock/s: ${availStock} Item/s`}</p>
                    </div>
                </div>
                <div className="self-center lg:col-start-5 lg:col-end-6 lg:justify-self-center">
                    <h1 className="font-ubuntu text-3xl font-bold text-left text-blue-600">{prod.price !== undefined ? `$ ${prod.price * prod.quantity}` : ""}</h1>
                </div>
            </div>
            <div className="lg:col-start-6 lg:col-end-7 lg:justify-self-center lg:self-center">
                <button onClick={() => removeItemFromCart(prod.id, prod.title, dispatch)} className="inline-block rounded-lg w-28 bg-red-500 text-center py-2 font-ubuntu text-white font-bold text-sm mb-5 lg:mb-0">Remove</button>
            </div>
            <div className="pt-5 border-t lg:col-start-1 lg:col-end-7">
                <h2 className="font-ubuntu text-base font-bold text-gray-500 mb-4">Shipping Options:</h2>
                <div>
                    <p className="text-right font-ubuntu text-sm text-blue-600">Within Metro Manila</p>
                    <p className="text-right text-gray-800 font-ubuntu text-sm mb-2 font-semibold">Starts at $ 60.00</p>
                    <p className="text-right font-ubuntu text-sm text-blue-600">Outside Metro Manila</p>
                    <p className="text-right text-gray-800 font-ubuntu text-sm font-semibold">Starts at $ 120.00</p>
                </div>
            </div>
        </div>
    )
}

export default Item
