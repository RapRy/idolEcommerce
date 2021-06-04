import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import * as api from '../../api'
import { quantityCheck } from '../../globalFunctions/Cart'

import OtherProducts from "../Products/OtherProducts"
import { ChevronRightIcon } from '@heroicons/react/outline'

const availStock = 30

const ProductDetails = () => {
    const { category, id } = useParams()
    const [details, setDetails] = useState({})
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.data)
    const { isMobile } = useSelector(state => state.nav)

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
        <div className="px-5 pt-10 pb-10 bg-gray-100">
            <div className="max-w-screen-xl mx-auto">
                {
                    isMobile === false &&
                        <div className="mb-14 ml-10">
                            <Link className="inline-block font-ubuntu font-medium text-base text-yellow-500 hover:underline" to="/">Home</Link>
                            <ChevronRightIcon className="inline-block w-6 h-6 text-gray-500" />
                            <span className="inline-block font-ubuntu font-normal text-base text-gray-500">Product</span>
                            <ChevronRightIcon className="inline-block w-6 h-6 text-gray-500" />
                            <span className="inline font-ubuntu font-medium underline text-base text-gray-500">{details.title !== undefined && details.title}</span>
                        </div>
                }

                {  
                    details && 
                        <div className="rounded-xl bg-white shadow-lg p-5 lg:p-10 mb-20 md:grid md:grid-cols-3 md:gap-5">
                            <div className="mb-8 md:mb-0">
                                <img className="w-52 mx-auto" src={details.image} alt={details.title} />
                            </div>
                            <div className="md:col-start-2 md:col-end-4">
                                <div>
                                    <h2 className="font-ubuntu text-xl font-semibold pb-3 text-gray-800">{details.title}</h2>
                                    <p className="font-ubuntu text-sm font-normal text-gray-500 leading-relaxed text-justify mb-6">{details.description}</p>
                                </div>
                                <div className="mt-6">
                                    <h1 className="font-ubuntu text-3xl font-bold pb-3 text-blue-600">{details.price !== undefined ? `$ ${details.price}` : ""}</h1>
                                    <div className="mt-2.5">
                                        <button onClick={() => setQuantity(prevState => parseInt(prevState) - 1)} className="bg-gradient-to-b from-gray-300 to-gray-200 inline-block px-2.5 py-2 rounded-md border border-gray-400 text-sm mr-2">➖</button>
                                        <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-14 text-center bg-white inline-block px-4 py-2 rounded-md border shadow-inner text-sm font-ubuntu font-bold text-blue-600" />
                                        <button onClick={() => setQuantity(prevState => parseInt(prevState) + 1)} className="bg-gradient-to-b from-gray-300 to-gray-200 inline-block px-2.5 py-2 rounded-md border border-gray-400 text-sm ml-2 mr-4">➕</button>
                                        <span className="text-base font-ubuntu font-normal text-gray-600">Quantity</span>
                                        <p className="pb-5 font-ubuntu text-sm text-blue-600 font-semibold mt-2">{`Available Stock/s: ${availStock} Item/s`}</p>
                                    </div>
                                    <div className="mt-8">
                                        <a href="/" className="inline-block rounded-lg w-40 bg-yellow-500 text-center py-3 font-ubuntu text-white font-bold text-base mr-4">Buy Item</a>
                                        <button onClick={() => quantityCheck(details, availStock, dispatch, cart, quantity, setQuantity, 'addQuantity')} className="inline-block rounded-lg w-40 bg-blue-600 text-center py-3 font-ubuntu text-white font-bold text-base">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
                <OtherProducts />
            </div>
        </div>
    )
}

export default ProductDetails
