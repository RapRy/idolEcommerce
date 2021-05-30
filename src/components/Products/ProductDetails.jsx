import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import * as api from '../../api'
import { addToCart } from '../../globalFunctions/Cart'

import { ShoppingCartIcon } from '@heroicons/react/solid'

const ProductDetails = () => {
    const { category, id } = useParams()
    const [details, setDetails] = useState({})
    const [otherProducts, setOtherProds] = useState([])
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.data)

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const { data, status } = await api.getProducts(`products/category/${category.replace("-", " ")}`)

                if(status === 200){
                    return data.filter(prod => prod.id !== parseInt(id))
                }else if(status === 400){
                    console.log('no results')
                }
            }

            const fetchDetails = async () => {
                const { data, status } = await api.getProductDetails(id)

                if(status === 200){
                    setDetails(data)

                    const fromCartQuantity = cart.items.filter((prod) => prod.id === data.id)
                    setQuantity(fromCartQuantity.length > 0 ? fromCartQuantity[0].quantity : 1)

                    const otherProds = await fetchProducts()

                    setOtherProds(otherProds)
                }else if(status === 400){
                    console.log('no details')
                }
            }

            fetchDetails()
        } catch (error) {
            console.log(error)
        }
    }, [id])

    return (
        <div className="px-5 pt-10 bg-gray-100">
            {  
                details && 
                    <div className="rounded-xl bg-white shadow-lg p-5 mb-20">
                        <div className="mb-8">
                            <img className="w-52 mx-auto" src={details.image} alt={details.title} />
                        </div>
                        <div>
                            <h2 className="font-ubuntu text-xl font-semibold pb-3 text-gray-800">{details.title}</h2>
                            <p className="font-ubuntu text-sm font-normal text-gray-500 leading-relaxed text-justify mb-6">{details.description}</p>
                        </div>
                        <div className="mt-6">
                            <h1 className="font-ubuntu text-3xl font-bold pb-3 text-blue-600">{`$ ${details.price}`}</h1>
                            <div className="mt-2.5">
                                <button onClick={() => setQuantity(prevState => prevState - 1)} className="bg-gradient-to-b from-gray-300 to-gray-200 inline-block px-2.5 py-2 rounded-md border border-gray-400 text-sm mr-2">➖</button>
                                <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-14 text-center bg-white inline-block px-4 py-2 rounded-md border shadow-inner text-sm font-ubuntu font-bold text-blue-600" />
                                <button onClick={() => setQuantity(prevState => prevState + 1)} className="bg-gradient-to-b from-gray-300 to-gray-200 inline-block px-2.5 py-2 rounded-md border border-gray-400 text-sm ml-2 mr-4">➕</button>
                                <span className="text-base font-ubuntu font-normal text-gray-600">Quantity</span>
                            </div>
                            <div className="mt-8">
                                <a href="#" className="inline-block rounded-lg w-40 bg-yellow-500 text-center py-3 font-ubuntu text-white font-bold text-base mr-4">Buy Item</a>
                                <button onClick={() => addToCart(details, dispatch, cart.items, quantity, 'addQuantity')} className="inline-block rounded-lg w-40 bg-blue-600 text-center py-3 font-ubuntu text-white font-bold text-base">Add to Cart</button>
                            </div>
                        </div>
                    </div>
            }

            {
                otherProducts && 
                    <div>
                        <h1 className="font-ubuntu text-lg font-medium text-gray-800 ml-4">Other Products You Might Like</h1> 
                        <div className="grid grid-cols-2 gap-5 mt-6 mb-8">
                            {
                                otherProducts.map((product, i) => (
                                    <div className="rounded-lg bg-white shadow-lg p-5" key={product.id}>
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
                                            <span className="font-ubuntu text-sm text-blue-900 font-bold">{`$ ${product.price}`}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export default ProductDetails
