import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as api from '../../api'
import { setProducts } from '../../redux/dataReducer'

import _ from 'lodash'

import Thumbnail from './Thumbnail'

const OtherProducts = () => {
    const { products } = useSelector(state => state.data)
    const [otherProducts, setOtherProducts] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {

        if(products.length === 0){
            try {
                const fetchProducts = async () => {
                    const { data, status } = await api.getProducts("products")

                    if(status === 200){
                        const shuffled = _.shuffle(data)

                        dispatch(setProducts(shuffled))
                        setOtherProducts(shuffled.filter((prod, i) => i < 6))
                    }else if(status === 400){
                        console.log('no results')
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            const shuffled = _.shuffle(products)

            setOtherProducts(shuffled.filter((prod, i) => i < 6))
        }

    }, [products])

    return (
        <div>
            <h1 className="font-ubuntu text-lg font-medium text-gray-800 ml-4">Other Products You Might Like</h1>
            <div className="grid grid-cols-2 gap-5 mt-6 mb-8">
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
