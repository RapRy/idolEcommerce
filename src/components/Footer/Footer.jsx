import { SocialIcon } from 'react-social-icons'
import Logo from '../../images/logo_ry_2020 1.svg'

const Footer = () => {
    return (
        <div className="p-10 bg-gray-800 lg:py-20">
            <div className="max-w-screen-xl mx-auto">
                <div className="border-gray-400 border-b lg:grid lg:grid-cols-4 lg:gap-4 lg:pb-12">
                    <div className="mb-10 lg:mr-5 lg:mb-0">
                        <h1 className="font-ubuntu text-xl lg:text-2xl text-white font-black mb-4 lg:mb-7">Contact Numbers</h1>
                        <p className="font-ubuntu text-base lg:text-lg text-gray-400 font-bold mb-2 lg:mb-4">0000-000-0000 (Mobile)</p>
                        <p className="font-ubuntu text-base lg:text-lg text-gray-400 font-bold">1111-111-1111 (Telephone)</p>
                    </div>
                    <div className="mb-10 pb-3 lg:mb-0">
                        <h1 className="font-ubuntu text-xl lg:text-2xl text-white font-black mb-4">Follow Us</h1>
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-5 lg:gap-4">
                            <div className="flex items-center lg:-ml-4">
                                <SocialIcon url="facebook.com" bgColor="transparent"  fgColor="#9CA3AF" />
                                <a href="facebook.com" className="font-ubuntu text-base lg:text-lg text-gray-400 font-bold hover:text-yellow-500 transition">Facebook</a>
                            </div>
                            <div className="flex items-center lg:-ml-4 lg:-mt-4">
                                <SocialIcon url="instagram.com" bgColor="transparent"  fgColor="#9CA3AF" />
                                <a href="instagram.com" className="font-ubuntu text-base text-gray-400 font-bold hover:text-yellow-500 transition">Instagram</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-10 lg:mt-12 lg:grid lg:grid-cols-3 lg:place-items-center">
                    <div className="grid grid-cols-2 gap-2 items-center mb-10 lg:mb-0 justify-self-start">
                        <p className="text-gray-400 text-xs italic justify-self-end">Powered By:</p>
                        <img src={Logo} alt="RapRy" />
                    </div>
                    <p className="font-ubuntu text-xs lg:text-base text-white font-medium pb-12 lg:pb-0">© 2021 RapRy All Rights Reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
