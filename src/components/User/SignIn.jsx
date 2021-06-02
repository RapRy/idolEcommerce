import { Link } from 'react-router-dom'

const SignIn = () => {
    return (
        <div className="py-20 px-5 bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-5">
                <form action="#">
                    <div className="mb-5">
                        <label htmlFor="uname" className="font-ubuntu text-xs text-gray-600 mb-1.5 block">Username or Email</label>
                        <input className="w-full bg-gray-200 rounded-lg px-2.5 py-3.5 shadow-inner font-ubuntu font-medium text-sm text-gray-800" type="text" name="uname" id="uname" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="pword" className="font-ubuntu text-xs text-gray-600 mb-1.5 block">Password</label>
                        <input className="w-full bg-gray-200 rounded-lg px-2.5 py-3.5 shadow-inner font-ubuntu font-medium text-sm text-gray-800" type="password" name="pword" id="pword" />
                    </div>
                    <div>
                        <button className="w-full rounded-lg bg-yellow-500 py-3 font-ubuntu font-bold text-base text-white mb-5" type="submit">Login</button>
                        <div className="text-center">
                            <Link to="/password/forgot" className="font-ubuntu text-sm text-blue-500 leading-8 hover:text-yellow-500">Forgot password?</Link><br />
                            <Link to="/register" className="font-ubuntu text-sm text-blue-500 leading-8 hover:text-yellow-500">New to IE? Register here.</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn
