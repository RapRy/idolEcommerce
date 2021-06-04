import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToCart } from '../../globalFunctions/Cart'

import { ShoppingCartIcon } from '@heroicons/react/solid'

const Thumbnail = ({ product }) => {
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.data)

    return (
        <div className="rounded-lg bg-white shadow-lg p-5 lg:p-7">
            <div className="w-full h-40 text-center relative mb-5">
                <Link to={`/store/${product.category.replace(" ", "-")}/item/${product.id}`}>
                    <img src={product.image} alt={product.title} className="h-full inline-block object-contain" />
                </Link>
                <button onClick={() => addToCart(product, dispatch, cart, 1, "addToCart")} className="bg-blue-800 hover:bg-blue-600 w-14 h-14 rounded-full absolute -bottom-2.5 right-0 shadow-md">
                    <ShoppingCartIcon className="w-9 h-9 mt-1 ml-2.5 text-white" />
                </button>
            </div>
            <div>
                <p className="whitespace-nowrap overflow-ellipsis overflow-x-hidden font-ubuntu text-sm font-semibold pb-3 text-gray-800">{product.title}</p>
                <span className="font-ubuntu text-sm lg:text-base text-blue-900 font-bold">{`$ ${product.price}`}</span>
            </div>
        </div>
    )
}

export default Thumbnail
