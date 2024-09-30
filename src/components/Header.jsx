import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import Avatar from '../assets/Avatar.svg'
import { ChevronUp, LogOut } from 'lucide-react'
import navButton from '../assets/SideNavBar/navButton.svg'
import NavBar from './NavBar'
import SignOutModal from './SignOutModal'

const Header = () => {
    const userName = localStorage.getItem('userName')
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [navbarVisible, setNavbarVisible] = useState(false)
    const [showSignOutModal, setShowSignOutModal] = useState(false)

    const navigate = useNavigate()

    function toggleNavbar() {
        setNavbarVisible(!navbarVisible)
    }
    const handleLogoutRedirect = () => {
        navigate('/logout', { replace: true })
        sessionStorage.clear()
        localStorage.clear()
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <header className="px-12 2xl:px-24 4xl:px-32 py-6 relative">
            <div className="mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <button
                        className="bg-primary-50 rounded-md"
                        onClick={toggleNavbar}
                    >
                        <img src={navButton} alt="Nav button" />
                    </button>
                    <img src={Logo} alt="Logo" />
                </div>

                <NavBar
                    navbarVisible={navbarVisible}
                    toggleNavbar={toggleNavbar}
                />

                <nav className="flex space-x-16">
                    <p className="text-primary-Main font-arial font-bold hover:text-primary-300">
                        Land Bank
                    </p>
                    <p className="text-primary-Main font-arial font-bold hover:text-primary-300">
                        More Analytics
                    </p>
                    <p className="text-primary-Main font-arial font-bold hover:text-primary-300">
                        Reports
                    </p>
                </nav>

                <div className="relative flex items-center space-x-4">
                    <img
                        src={Avatar}
                        alt="Profile"
                        className="h-10 w-10 rounded-full border border-black cursor-pointer"
                        onClick={() => {
                            setShowSignOutModal(!showSignOutModal)
                            setDropdownVisible(!dropdownVisible)
                        }}
                    />
                    <span className="font-majalla whitespace-nowrap  text-[#000000] text-[16px] 2xl:text-xl font-bold">
                        {userName}
                    </span>
                    <button
                        onClick={handleLogoutRedirect}
                        className="w-full px-2 py-2 text-left text-gray-700 flex justify-center gap-x-2 items-center"
                    >
                        <LogOut />
                        Logout
                    </button>
                    {/* {showSignOutModal && (
                        <div>
                            <SignOutModal
                                showSignOutModal={showSignOutModal}
                                setShowSignOutModal={setShowSignOutModal}
                            />
                        </div>
                    )} */}
                </div>
            </div>
        </header>
    )
}

export default Header
