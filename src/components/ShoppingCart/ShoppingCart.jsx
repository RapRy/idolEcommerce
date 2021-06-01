import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import _ from 'lodash'

import Item from './Item'
import Checkout from './Checkout'

const ShoppingCart = () => {
    const { cart, products } = useSelector(state => state.data)

    useEffect(() => {
        const shuffledData = _.shuffle(products)
        
    }, [products])

    return (
        <div className="py-3 px-5 bg-gray-100">
            <h1 className="font-ubuntu text-lg font-medium text-gray-500 mb-4">Shopping Cart</h1> 
            <div className="grid grid-cols-customGrid2 gap-20 bg-white shadow-md rounded-xl px-5 py-3 mb-5">
                <span className="text-sm font-ubuntu text-gray-800 ml-5">{ cart.count > 1 ? "Items" : "Item" }</span>
                <span className="text-sm font-ubuntu text-gray-800 ">Total Price</span>
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
        </div>
    )
}

export default ShoppingCart
