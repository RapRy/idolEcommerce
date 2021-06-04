import { ShoppingBagIcon } from '@heroicons/react/solid'

const Welcome = () => {
    return (
        <div className="text-center">
            <ShoppingBagIcon className="w-60 h-60 inline-block text-blue-900"/>
            <span className="block text-3xl text-blue-900 font-ubuntu font-bold mt-2">IDOL ECOMMERCE</span> 
            <p className="font-ubuntu text-2xl text-gray-500 mt-20">Welcome to Idol Ecommerce!</p>
        </div>
    )
}

export default Welcome
