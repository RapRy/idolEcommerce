import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ArrowSmRightIcon } from '@heroicons/react/outline'
import Welcome from './Welcome'

const Register = () => {
    const { isMobile } = useSelector(state => state.nav)

    return (
        <div className="py-20 px-5 bg-gray-100">
            <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:place-items-center max-w-screen-xl mx-auto">
                {
                    isMobile === false && <Welcome />
                }
                <div>
                    <div className="grid grid-cols-5 gap-2 place-items-center px-10 max-w-sm mx-auto">
                        <div className="text-center">
                            <h2 className="block w-18 h-18 py-3.5 rounded-full bg-yellow-500 font-ubuntu font-bold text-2xl text-white">1</h2>
                            <p className="font-ubuntu text-gray-800 text-base font-medium mt-1">Register</p>
                        </div>
                        <ArrowSmRightIcon className="w-10 text-gray-700 pb-6" />
                        <div className="text-center">
                            <h2 className="block w-18 h-18 py-3.5 px-6 rounded-full bg-gray-400 font-ubuntu font-bold text-2xl text-white">2</h2>
                            <p className="font-ubuntu text-gray-400 text-base font-medium mt-1">Verify</p>
                        </div>
                        <ArrowSmRightIcon className="w-10 text-gray-700 pb-6" />
                        <div className="text-center">
                            <h2 className="block w-18 h-18 py-3.5 px-6 rounded-full bg-gray-400 font-ubuntu font-bold text-2xl text-white">3</h2>
                            <p className="font-ubuntu text-gray-400 text-base font-medium mt-1">Done</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-xl p-5 mt-6 w-3/4 mx-auto">
                        <form action="#">
                            <div className="mb-5">
                                <label htmlFor="email" className="font-ubuntu text-xs text-gray-600 mb-1.5 block">Email</label>
                                <input className="w-full bg-gray-200 rounded-lg px-2.5 py-3.5 shadow-inner font-ubuntu font-medium text-sm text-gray-800" type="email" name="email" id="email" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="uname" className="font-ubuntu text-xs text-gray-600 mb-1.5 block">Username</label>
                                <input className="w-full bg-gray-200 rounded-lg px-2.5 py-3.5 shadow-inner font-ubuntu font-medium text-sm text-gray-800" type="text" name="uname" id="uname" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="pword" className="font-ubuntu text-xs text-gray-600 mb-1.5 block">Password</label>
                                <input className="w-full bg-gray-200 rounded-lg px-2.5 py-3.5 shadow-inner font-ubuntu font-medium text-sm text-gray-800" type="password" name="pword" id="pword" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="rtpword" className="font-ubuntu text-xs text-gray-600 mb-1.5 block">Re-enter Password</label>
                                <input className="w-full bg-gray-200 rounded-lg px-2.5 py-3.5 shadow-inner font-ubuntu font-medium text-sm text-gray-800" type="password" name="rtpword" id="rtpword" />
                            </div>
                            <div className="mb-5">
                                <input type="checkbox" name="tnc" id="tnc" />
                                <label htmlFor="tnc" className="font-ubuntu text-xs text-gray-600 mb-1.5 ml-2">I hereby certify that all information is true and accurate and agree to the <a href="/" className="text-blue-500 hover:text-yellow-500">IE Terms and Conditions</a>.</label>
                            </div>
                            <div>
                                <button className="w-full rounded-lg bg-yellow-500 py-3 font-ubuntu font-bold text-base text-white mb-5" type="submit">Register</button>
                                <div className="text-center">
                                    <Link to="/login" className="font-ubuntu text-sm text-blue-500 leading-8 hover:text-yellow-500">Alaready have an account? Login</Link><br />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
