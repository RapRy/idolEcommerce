import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navigation from './Navigation'
import SearchBar from './SearchBar'
import { ShoppingCartIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/solid'

import _ from 'lodash'

const Header = () => {
    const [isMobile, setIsMobile] = useState(true)
    const { cart } = useSelector(state => state.data)

    return (
        <>
            <div className="bg-blue-900 grid grid-cols-2 items-center px-6 py-2">
                <div>
                    <p className="font-ubuntu text-gray-300 text-sm">Don't have an account? <Link to="/" className="underline text-white">Register</Link></p>
                </div>
                <div className="justify-self-end">
                    <Link to="/" className="text-white"><UserIcon className="w-7 h-7 inline-block mr-1" /> <span className="font-ubuntu text-sm">Login</span></Link>
                </div>
            </div>
            <div className="relative grid grid-cols-customGrid gap-3 items-center px-5 py-3 bg-white">
                <div>
                    <Link to="/">
                        <ShoppingBagIcon className="w-10 h-10 inline-block text-blue-900" />
                        <span className="inline-block text-lg text-blue-900 font-ubuntu font-bold relative top-1">IDOL ECOMMERCE</span>
                    </Link>
                </div>
                <div>
                    {isMobile === false && <SearchBar />}
                    <Link to="/" className="rounded-lg bg-blue-800 block p-1.5 relative">
                        <ShoppingCartIcon className="w-8 h-8 inline-block text-white" />
                        {
                            !_.isEmpty(cart) &&
                                <span className="absolute -top-1.5 -left-1.5 block bg-yellow-500 rounded-full px-2 py-0.5 font-ubuntu font-bold text-sm text-white">{cart.count}</span>
                        }
                    </Link>
                </div>
                <div>
                    <Navigation isMobile={isMobile} />
                </div>
            </div>
        </>
    )
}

export default Header