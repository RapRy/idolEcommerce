import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import * as api from '../../api'
import { setProducts } from '../../redux/dataReducer'
import Thumbnail from './Thumbnail'

const OtherProducts = () => {
    const [otherProducts, setOtherProducts] = useState([])

    const { products } = useSelector(state => state.data)
    const dispatch = useDispatch()

    useEffect(() => {

        if(products.length === 0){
            // global state products is empty
            try {
                const fetchProducts = async () => {
                    // api request
                    const { data, status } = await api.getProducts("products")

                    if(status === 200){
                        // shuffle position
                        const shuffled = _.shuffle(data)
                        // update global state
                        dispatch(setProducts(shuffled))
                        // update state limit 6 products
                        setOtherProducts(shuffled.filter((prod, i) => i < 6))
                    }else if(status === 400){
                        console.log('no results')
                    }
                }
                // invoke function
                fetchProducts()
            } catch (error) {
                console.log(error)
            }
        }else{
            // global state products not empty
            // shuffle position
            const shuffled = _.shuffle(products)
            // update state limit 6 products
            setOtherProducts(shuffled.filter((prod, i) => i < 6))
        }

    }, [products, dispatch])

    return (
        <div>
            <h1 className="font-ubuntu text-lg font-medium text-gray-800 ml-4">Other Products You Might Like</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-6 mb-8">
                {
                    otherProducts.map((prod) => (
                        <Thumbnail key={prod.id} product={prod} />
                    ))
                }
            </div>
        </div>
    )
}

export default OtherProducts
