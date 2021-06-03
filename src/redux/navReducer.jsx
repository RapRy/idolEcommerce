import { createSlice } from '@reduxjs/toolkit'

export const navSlice = createSlice({
    name: "navSlice",
    initialState: {
        isMobile: true,
        selectedCategory: "HOME"
    },
    reducers: {
        setIsMobile: (state, action) => {
            state.isMobile = action.payload
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        }
    }
})

export const { setIsMobile, setSelectedCategory } = navSlice.actions

export default navSlice.reducer