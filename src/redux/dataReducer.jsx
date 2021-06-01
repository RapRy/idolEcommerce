import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

export const dataSlice = createSlice({
    name: 'dataSlice',
    initialState: {
        categories: [],
        products:[],
        cart:{
            items: [],
            count: 0
        }
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        updateCart: (state, action) => {
            const newCart = state.cart.items.filter((prod) => prod.id !== action.payload.id)

            if(state.cart.items.length > 0){
                state.cart.items = [ ...newCart, action.payload ]
                const quantity = state.cart.items.map(prod => prod.quantity)

                state.cart.count = _.sum(quantity)
            }else{
                state.cart.items = [ ...state.cart.items, action.payload ]
                const quantity = state.cart.items.map(prod => prod.quantity)

                state.cart.count = _.sum(quantity)
            }
        },
        removeItem: (state, action) => {
            const newCart = state.cart.items.filter((prod) => prod.id !== action.payload)

            state.cart.items = newCart

            const quantity = newCart.map(prod => prod.quantity)

            state.cart.count = _.sum(quantity)
        },
        removeAll: (state) => {
            state.cart = { items: [], count: 0 }
        }
    }
})

export const { setCategories, setProducts, updateCart, removeItem, removeAll } = dataSlice.actions

export default dataSlice.reducer