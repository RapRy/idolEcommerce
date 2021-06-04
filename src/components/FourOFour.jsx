import { Link } from 'react-router-dom'

import image from '../images/404.png'

const FourOFour = () => {
    return (
        <div className="max-w-screen-sm mx-auto my-14 text-center">
            <img src={image} alt="" />
            <p className="font-ubuntu text-2xl text-gray-700 font-semibold py-7">Sorry, this page is not available</p>
            <Link to="/" className="inline-block rounded-lg w-28 bg-blue-600 py-3 font-ubuntu text-white font-bold text-base mb-10 mt-5">Shop Now</Link>
        </div>
    )
}

export default FourOFour
