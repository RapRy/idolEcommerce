import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './dataReducer'
import navReducer from './navReducer'

export default configureStore({
    reducer: {
        data: dataReducer,
        nav: navReducer
    },
})