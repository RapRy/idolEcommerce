import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

import { setIsMobile, setSelectedCategory } from '../../redux/navReducer'

import Navigation from './Navigation'
import SearchBar from './SearchBar'
import { ShoppingCartIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/solid'


const Header = () => {
    const { cart } = useSelector(state => state.data)
    const { isMobile } = useSelector(state => state.nav)
    const dispatch = useDispatch()

    const signIn = useRouteMatch("/login")
    const register = useRouteMatch("/register")
    const passForgot = useRouteMatch("/password/forgot")

    useEffect(() => {
        window.addEventListener('resize', () => {
            if(window.matchMedia("(min-width: 1024px)").matches){
                if(setIsMobile !== false)
                    dispatch(setIsMobile(!isMobile))
            }else{
                if(setIsMobile !== true)
                    dispatch(setIsMobile(true))
            }
        })

        if(window.matchMedia("(min-width: 1024px)").matches || window.matchMedia("(min-width: 1280px)").matches || window.matchMedia("(min-width: 1536px)").matches){
            dispatch(setIsMobile(!isMobile))
        }
    }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {
                (signIn === null && register === null && passForgot === null) &&
                    <div className="bg-blue-900 px-6 py-2">
                        <div className="grid grid-cols-2 md:grid-cols-customGrid2 md:gap-14 items-center max-w-screen-xl mx-auto">
                            <div className="md:justify-self-end">
                                <p className="font-ubuntu text-gray-300 text-sm">Don't have an account? <Link to="/register" onClick={() => dispatch(setSelectedCategory("Register"))} className="underline text-white">Register</Link></p>
                            </div>
                            <div className="justify-self-end">
                                <Link to="/login" onClick={() => dispatch(setSelectedCategory("Login"))} className="text-white"><UserIcon className="w-7 h-7 inline-block mr-1" /> <span className="font-ubuntu text-sm">Login</span></Link>
                            </div>
                        </div>
                    </div>
            }
            <div className={`relative px-5 py-3 lg:py-6 bg-white ${ signIn === null && register === null && passForgot === null ? "" : "shadow-md" }`}>
                <div className="grid grid-cols-customGrid lg:grid-cols-3 gap-3 items-center max-w-screen-xl mx-auto">
                    <div>
                        <Link to="/" onClick={() => dispatch(setSelectedCategory("HOME"))}>
                            <ShoppingBagIcon className="w-10 h-10 inline-block text-blue-900" />
                            <span className="inline-block text-lg text-blue-900 font-ubuntu font-bold relative top-1">IDOL ECOMMERCE</span>
                        </Link>
                    </div>
                    <div className="lg:col-start-3 lg:col-end-4 lg:grid lg:grid-cols-customGrid2 lg:gap-3">
                        {isMobile === false && <SearchBar />}
                        <Link to="/cart" className="rounded-lg bg-blue-800 block p-1.5 relative">
                            <ShoppingCartIcon className="w-8 h-8 inline-block text-white" />
                            {
                                cart.count !== 0 &&
                                    <span className="absolute -top-1.5 -left-1.5 block bg-yellow-500 rounded-full px-2 py-0.5 font-ubuntu font-bold text-sm text-white">{cart.count}</span>
                            }
                        </Link>
                    </div>
                    <div className="lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:justify-self-center">
                        <Navigation isMobile={isMobile} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
