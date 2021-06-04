import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ArrowSmRightIcon } from '@heroicons/react/outline'
import Welcome from './Welcome'

const ForgotPassword = () => {
    const { isMobile } = useSelector(state => state.nav)

    return (
        <div className="py-20 px-5 bg-gray-100">
            <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:place-items-center max-w-screen-xl mx-auto">
                {
                    isMobile === false && <Welcome />
                }
                <div className="bg-white shadow-md rounded-xl p-5 w-3/4">
                    <form action="#">
                        <div className="mb-5">
                            <p className="text-center font-ubuntu font-medium text-lg text-gray-700 pb-5">Enter your registered email</p>
                            <input className="w-full bg-gray-200 rounded-lg px-2.5 py-3.5 shadow-inner font-ubuntu font-medium text-sm text-gray-800 mb-5" type="email" name="email" />
                            <p className="font-ubuntu text-sm text-gray-600 text-center">A one-time pin for the password reset will be sent to your email.</p>
                        </div>
                        <div>
                            <button className="w-full rounded-lg bg-yellow-500 py-3 font-ubuntu font-bold text-base text-white mb-5" type="submit">Submit</button>
                            <div className="text-center">
                                <Link to="/login" className="font-ubuntu text-sm text-blue-500 leading-8 hover:text-yellow-500">Already have an account? Login</Link><br />
                                <Link to="/register" className="font-ubuntu text-sm text-blue-500 leading-8 hover:text-yellow-500">New to IE? Register here.</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
