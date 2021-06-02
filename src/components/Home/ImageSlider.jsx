import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'


const imgPlaceholder = [
    "https://via.placeholder.com/1200/000000/FFFFFF/?text=Banner 1",
    "https://via.placeholder.com/1200/FF0000/FFFFFF?Text=Banner 2"
]

const ImageSlider = () => {

    return (
        <div className="h-96">
            <Carousel showThumbs={false} showIndicators={true} showStatus={false} infiniteLoop={true} autoPlay={true} showArrows={false} interval={5000}>
                {
                    imgPlaceholder.map((img, i) => <img className="h-96" key={i} src={img} alt={`Banner ${++i}`} />)
                }
            </Carousel>
        </div>
    )
}

export default ImageSlider
