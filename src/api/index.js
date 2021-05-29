import axios from 'axios'

export const getCategories = () => axios.get('https://fakestoreapi.com/products/categories')
export const getProducts = (additionalRoute) => axios.get(`https://fakestoreapi.com/${additionalRoute}`)
export const getProductDetails = (id) => axios.get(`https://fakestoreapi.com/products/${id}`)