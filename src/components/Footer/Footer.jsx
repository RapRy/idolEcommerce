import { SocialIcon } from 'react-social-icons'
import Logo from '../../images/logo_ry_2020 1.svg'

const Footer = () => {
    return (
        <div className="p-10 bg-gray-800">
            <div className="mb-10">
                <h1 className="font-ubuntu text-xl text-white font-black mb-4">Contact Numbers</h1>
                <p className="font-ubuntu text-base text-gray-400 font-bold mb-2">0000-000-0000 (Mobile)</p>
                <p className="font-ubuntu text-base text-gray-400 font-bold">1111-111-1111 (Telephone)</p>
            </div>
            <div className="mb-10 border-b pb-3 border-gray-400">
                <h1 className="font-ubuntu text-xl text-white font-black mb-4">Follow Us</h1>
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex items-center">
                        <SocialIcon url="facebook.com" bgColor="transparent"  fgColor="#9CA3AF" />
                        <a href="facebook.com" className="font-ubuntu text-base text-gray-400 font-bold hover:text-yellow-500 transition">Facebook</a>
                    </div>
                    <div className="flex items-center">
                        <SocialIcon url="instagram.com" bgColor="transparent"  fgColor="#9CA3AF" />
                        <a href="instagram.com" className="font-ubuntu text-base text-gray-400 font-bold hover:text-yellow-500 transition">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <div className="grid grid-cols-2 gap-2 items-center mb-10">
                    <p className="text-gray-400 text-xs italic justify-self-end">Powered By:</p>
                    <img src={Logo} alt="RapRy" />
                </div>
                <p className="font-ubuntu text-xs text-white font-medium pb-12">© 2021 RapRy All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
