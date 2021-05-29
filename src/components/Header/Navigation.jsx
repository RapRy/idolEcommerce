import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setCategories } from '../../redux/dataReducer'
import * as api from '../../api'

import { Listbox } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import SearchBar from './SearchBar'

const Navigation = ({ isMobile }) => {
    const dispatch = useDispatch()
    const [categories, setCats] = useState([]) 
    const [selectedCategory, setSelectedCategory] = useState("")
    const [isShow, setIsShow] = useState(false)

    const handleClickCategory = (cat) => {
        setSelectedCategory(cat)
        setIsShow((prevState) => !prevState)
    }

    useEffect(() => {

        try {
            const fetchCategories = async () => {
                const { data, status } = await api.getCategories()
    
                if(status === 200){
                    dispatch(setCategories(data))
                    setCats(data)
                    setSelectedCategory(data[0])
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
                <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                    <Listbox.Button>{selectedCategory}</Listbox.Button>
                    <Listbox.Options>
                        <Listbox.Option>
                            <NavLink to="/">HOME</NavLink>
                        </Listbox.Option>
                        {
                            categories.map((cat, i) => (
                                <Listbox.Option key={i} value={cat}>
                                    <NavLink to={`/store/${cat.replace(" ", "-")}`}>{cat}</NavLink>
                                </Listbox.Option>
                            ))
                        }
                    </Listbox.Options>
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
