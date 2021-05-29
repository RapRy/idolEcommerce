import ImageSlider from './ImageSlider'
import Categories from './Categories'
import ProductList from '../Products/ProductList'

const Home = () => {
    return (
        <div className="pb-10 bg-gray-100">
            <ImageSlider />
            <Categories />
            <ProductList heading="All Products" apiRoute="products" domRoute="/page" />
        </div>
    )
}

export default Home
