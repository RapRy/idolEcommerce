import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { quantityCheck, removeItemFromCart } from '../../globalFunctions/Cart'

const availStock = 30

const Item = ({ prod, cart }) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(prod.quantity)

    useEffect(() => {
        if(prod.quantity !== quantity){
            quantityCheck(prod, availStock, dispatch, cart.items, quantity, setQuantity, 'addQuantityFromCart')
        }
    }, [quantity])

    return (
        <div className="bg-white shadow-md rounded-xl p-5 mb-5">
            <div className="grid grid-cols-customGrid2 gap-20">
                <div>
                    <Link to={`/store/${prod.category.replace(" ", "-")}/item/${prod.id}`}>
                        <img className="mb-4 h-60" src={prod.image} alt={prod.title} />
                    </Link>
                    <p className="font-ubuntu text-base font-semibold pb-5 text-gray-800">{prod.title}</p>
                    <p className="font-ubuntu text-xl font-semibold pb-5 text-blue-700">{`$ ${prod.price} `}<span className="text-sm font-ubuntu font-normal text-gray-600">Price per item</span></p>
                    <div className="mb-2">
                        <button onClick={() => setQuantity(prevState => parseInt(prevState) - 1)} className="bg-gradient-to-b from-gray-300 to-gray-200 inline-block px-2 py-2 rounded-md border border-gray-400 text-sm mr-2">➖</button>
                        <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-10 text-center bg-white inline-block px-3 py-2 rounded-md border shadow-inner text-sm font-ubuntu font-bold text-blue-600" />
                        <button onClick={() => setQuantity(prevState => parseInt(prevState) + 1)} className="bg-gradient-to-b from-gray-300 to-gray-200 inline-block px-2 py-2 rounded-md border border-gray-400 text-sm ml-2 mr-2">➕</button>
                        <span className="text-sm font-ubuntu font-normal text-gray-600">Quantity</span>
                    </div>
                    <p className="pb-5 font-ubuntu text-sm text-blue-600 font-semibold">{`Available Stock/s: ${availStock} Item/s`}</p>
                </div>
                <div className="self-center">
                    <h1 className="font-ubuntu text-3xl font-bold text-left text-blue-600">{prod.price !== undefined ? `$ ${prod.price * prod.quantity}` : ""}</h1>
                </div>
            </div>
            <div>
                <button onClick={() => removeItemFromCart(prod.id, prod.title, dispatch)} className="inline-block rounded-lg w-28 bg-red-500 text-center py-2 font-ubuntu text-white font-bold text-sm mb-5">Remove</button>
            </div>
            <div className="pt-5 border-t">
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
