// import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Categories = () => {
    // const [isMobile, setIsMobile] = useState(true)
    const { categories } = useSelector(state => state.data)

    return (
        <div className="mt-10 px-5">
            <h1 className="font-ubuntu text-lg font-medium text-gray-800 ml-4">Categories</h1>
            <div className="rounded-3xl shadow-2xl grid grid-cols-2 mt-6 p-2 bg-white">
                {
                    categories.map((cat, i) => (
                        <Link to={`/store/${cat.replace(" ", "-")}`} key={i} className={`px-10 h-40 text-center border-gray-200 ${(i === 0 || i === 2) ? "border-r-2" : ""} ${(i === 2 || i === 3) ? "border-t-2" : ""}`}>
                            <span className="font-ubuntu font-bold text-xl capitalize text-blue-800 inline-block relative top-1/2 transform -translate-y-1/2 hover:-translate-y-1/2 hover:scale-110 transition">
                                {cat}
                            </span>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
