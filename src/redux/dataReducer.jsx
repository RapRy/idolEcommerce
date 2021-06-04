import { createSlice } from '@reduxjs/toolkit'
// import _ from 'lodash'

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
            state.cart = action.payload
        },
        removeItem: (state, action) => {
            state.cart = action.payload
        },
        removeAll: (state) => {
            state.cart = { items: [], count: 0 }
        }
    }
})

export const { setCategories, setProducts, updateCart, removeItem, removeAll } = dataSlice.actions

export default dataSlice.reducer