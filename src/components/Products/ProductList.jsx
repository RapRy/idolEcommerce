import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { useHistory, useParams } from 'react-router-dom'

import * as api from '../../api'
import { setProducts } from '../../redux/dataReducer'
import _ from 'lodash'

import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'

import Thumbnail from './Thumbnail'

const ProductList = ({ heading, apiRoute, domRoute }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { pageNumber, category } = useParams()

    const [products, setProds] = useState([])
    const [currentProducts, setCurProds] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [offset, setOffset] = useState(6) 

    const pageChange = ({selected}) => history.push(`${domRoute}/${selected + 1}`)

    const apiRequest = (offset) => {
        try {
            const fetchProducts = async () => {
                const { data, status } = await api.getProducts(apiRoute)

                if(status === 200){
                    const shuffledData = _.shuffle(data)
                    const curProds = []
                    const limit = offset

                    dispatch(setProducts(shuffledData))
                    setProds(shuffledData)
                    setPageCount(Math.ceil(data.length / offset))

                    for(let i = 0; i < limit; i++){
                        if(shuffledData[i] !== undefined)
                            curProds.push(shuffledData[i])
                    }

                    setCurProds(curProds)   
                    
                }else if(status === 400){
                    console.log('no results')
                }
            }

            fetchProducts()
        } catch (error) {
            console.log(error)
        }
    }

    const resetGrid = (offset) => {

        setPageCount(Math.ceil(products.length / offset))
        const newOffset = offset * (parseInt(pageNumber) - 1)
        const limit = newOffset + offset
        const curProds = []

        if(_.isEmpty(products)){
            history.push('/')
        }else{
            for(let i = newOffset; i < limit; i++){

                if(products[i] !== undefined)
                    curProds.push(products[i])
            }

            setCurProds(curProds)
        }
    }

    useEffect(() => {

        if(window.matchMedia("(min-width: 1280px)").matches){
            setOffset(10)
            if(pageNumber !== undefined || products.length > 10){
                resetGrid(10)
            }else{
                apiRequest(10)  
            }
        }else if(window.matchMedia("(min-width: 1024px)").matches){
            setOffset(8)
            if(pageNumber !== undefined || products.length > 8){
                resetGrid(8)
            }else{
                apiRequest(8)  
            }
        }else{
            if(pageNumber !== undefined || products.length > offset){
                resetGrid(offset)
            }else{
                apiRequest(offset)  
            }
        }

    }, [dispatch, category, pageNumber])

    return (
        <div className="mt-10 px-5 relative z-10 max-w-screen-xl mx-auto">
            { heading !== "" && <h1 className="font-ubuntu text-lg lg:text-xl font-medium text-gray-800 ml-4">{heading}</h1> }
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${ currentProducts.length > 4 ? "4" : currentProducts.length } xl:grid-cols-${ currentProducts.length > 5 ? "5" : currentProducts.length } gap-5 mt-6 mb-8`}>
                {
                    currentProducts &&
                        currentProducts.map((product) => (
                            <Thumbnail key={product.id} product={product} />
                        ))
                }
            </div>

            {
                    <ReactPaginate
                        containerClassName="max-w-screen-md text-center mx-auto lg:mt-20 lg:mb-10"
                        previousLabel={<ChevronDoubleLeftIcon className="w-6 text-blue-900 mr-2 hover:bg-white hover:text-yellow-500 transition rounded-sm p-1" />}
                        previousClassName="inline-block"
                        nextLabel={<ChevronDoubleRightIcon className="w-6 text-blue-900 ml-2 hover:bg-white hover:text-yellow-500 transition rounded-sm p-1" />}
                        nextClassName="inline-block"
                        pageCount={pageCount}
                        onPageChange={pageChange}
                        activeLinkClassName="font-bold text-yellow-500"
                        pageClassName="inline-block"
                        pageLinkClassName="font-ubuntu text-sm mx-1 hover:bg-white text-gray-800 hover:text-yellow-500 transition px-2 py-1 rounded-sm relative -top-1.5"
                        breakLabel="..."
                    />
            }
        </div>
    )
}

export default ProductList
