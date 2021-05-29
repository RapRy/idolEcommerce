import { useParams } from 'react-router-dom'

import ProductList from '../Products/ProductList'

const Store = () => {
    const { category } = useParams()
    return (
        <div className="pb-10 bg-gray-100">
            <div className="relative">
                <div className="h-96 w-full absolute top-0 left-0 z-0" style={{
                    backgroundColor: "#bacdd6",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%232e579a' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`
                }}></div>
                <h1 className="z-10 relative py-20 px-5 leading-normal text-center font-ubuntu text-4xl text-gray-800 font-black italic uppercase">{ category.replace("-", " ") }</h1>
            </div>
            <ProductList heading="" apiRoute={`products/category/${category.replace("-", " ")}`} domRoute={`store/${category}/page`} />
        </div>
    )
}

export default Store
