import React from 'react'

import { SearchIcon } from '@heroicons/react/outline'

const SearchBar = () => {
    return (
        <div className="relative">
            <form action="#">
                <input className="px-3 py-4 rounded-xl w-full font-ubuntu text-sm text-black font-medium shadow-inner" type="text" name="search" placeholder="Search products" />
                <button className="absolute top-3 right-3" type="submit">
                    <SearchIcon className="w-7 h-7 text-gray-700" />
                </button>
            </form>
        </div>
    )
}

export default SearchBar