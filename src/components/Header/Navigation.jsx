import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setCategories } from '../../redux/dataReducer'
import { setSelectedCategory } from '../../redux/navReducer'
import * as api from '../../api'

import { Listbox } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/outline'
import SearchBar from './SearchBar'

const Navigation = ({ isMobile }) => {
    const dispatch = useDispatch()
    const { selectedCategory } = useSelector(state => state.nav)
    const [categories, setCats] = useState([]) 
    const [isShow, setIsShow] = useState(false)

    const handleClickCategory = (cat) => {
        dispatch(setSelectedCategory(cat))
        setIsShow((prevState) => !prevState)
    }

    useEffect(() => {

        try {
            const fetchCategories = async () => {
                const { data, status } = await api.getCategories()
    
                if(status === 200){
                    dispatch(setCategories(data))
                    setCats(data)
                }else if(status === 400){
                    console.log('no results')
                }
            }
            
            fetchCategories()
        } catch (error) {
            console.log(error)
        }
    }, [dispatch])

    return (
        isMobile === false ?
            <div>
                <Listbox value={selectedCategory} onChange={(value) => dispatch(setSelectedCategory(value))}>
                    <div className="relative">
                        <Listbox.Button className="uppercase max-w-full relative text-left pr-7">
                            <span className="block font-ubuntu text-lg text-blue-900 font-black">{selectedCategory}</span>
                            <span className="absolute right-0 top-0.5">
                                <ChevronDownIcon className="w-6 h-6 text-blue-900" />
                            </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute left-1/2 transform -translate-x-1/2 w-60 z-50 bg-white p-5 rounded-lg shadow-xl">
                            <Listbox.Option value="HOME">
                                <NavLink className="uppercase block font-ubuntu text-lg text-blue-900 font-black leading-10" to="/">HOME</NavLink>
                            </Listbox.Option>
                            {
                                categories.map((cat, i) => (
                                    <Listbox.Option key={i} value={cat}>
                                        <NavLink className="uppercase block font-ubuntu text-lg text-blue-900 font-black leading-10" to={`/store/${cat.replace(" ", "-")}`}>{cat}</NavLink>
                                    </Listbox.Option>
                                ))
                            }
                        </Listbox.Options>
                    </div>
                </Listbox>
            </div>
        :
            <>
                <div>
                    <MenuIcon className="w-10 h-10 text-blue-900 cursor-pointer hover:scale-110 transition transform" onClick={() => setIsShow(prevState => (!prevState))} />
                </div>
                {
                    isShow &&
                        <div className="absolute top-16 left-0 w-full h-screen z-20 bg-blue-900 p-3">
                            <SearchBar />
                            <ul>
                                {
                                    categories.map((cat, i) => (
                                        <li key={i} className="pt-7">
                                            <NavLink to={`/store/${cat.replace(" ", "-")}`} onClick={() => handleClickCategory(cat)} className="font-ubuntu text-white font-bold text-lg uppercase">{cat}</NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                }
            </>
    )
}

export default Navigation
