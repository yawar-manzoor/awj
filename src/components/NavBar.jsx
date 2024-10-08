import React, { useEffect, useRef } from 'react'
import HomeIcon from '../assets/SideNavBar/HomeIcon.svg'
import FourSquare from '../assets/SideNavBar/FourSquare.svg'
import GraphIcon from '../assets/SideNavBar/graph.svg'
import PaperIcon from '../assets/SideNavBar/paper.svg'
import BinIcon from '../assets/SideNavBar/Bin.svg'
import TickIcon from '../assets/SideNavBar/Tick.svg'
import HelpIcon from '../assets/SideNavBar/Help.svg'
import { Link, useLocation } from 'react-router-dom'

const NavBar = ({ navbarVisible, toggleNavbar }) => {
    const navRef = useRef(null)
    const location = useLocation()
    const roleName = localStorage.getItem('roleName')

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                navbarVisible &&
                navRef.current &&
                !navRef.current.contains(event.target)
            ) {
                toggleNavbar()
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [navbarVisible, toggleNavbar])

    // useEffect(() => {
    //     if (navbarVisible) {
    //         toggleNavbar()
    //     }
    // }, [location.pathname])

    return (
        <>
            {navbarVisible && (
                <div
                    className="fixed inset-0 bg-[#B0A68C] opacity-50 z-40"
                    onClick={toggleNavbar}
                ></div>
            )}
            <div
                ref={navRef}
                className={`fixed top-0 left-0 w-[331px] h-full shadow-md transform z-50 sideNavBG ${
                    navbarVisible ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out`}
            >
                <div className="p-6 overflow-y-auto global-scroll max-h-screen">
                    <ul className="">
                        <Link
                            to={
                                roleName === 'Admin'
                                    ? '/landadmin'
                                    : '/landbank'
                            }
                            className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                            onClick={toggleNavbar}
                        >
                            <div className="rounded-full bg-primary-200 p-2">
                                <img src={HomeIcon} alt="err" />
                            </div>
                            <span>Home</span>
                        </Link>
                        <div className="text-primary-400 mt-3">Land Bank</div>

                        {roleName !== 'Admin' && (
                            <>
                                <Link
                                    to="/add-split-dashboard"
                                    className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                    onClick={toggleNavbar}
                                >
                                    <div className="rounded-full bg-primary-200 p-2">
                                        <img src={FourSquare} alt="err" />
                                    </div>
                                    <span>Add / Modify Land</span>
                                </Link>
                                <Link
                                    to=""
                                    className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                    onClick={toggleNavbar}
                                >
                                    <div className="rounded-full bg-primary-200 p-2">
                                        <img src={FourSquare} alt="err" />
                                    </div>
                                    <span>Land Ownership Update</span>
                                </Link>
                                <Link
                                    to=""
                                    className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                    onClick={toggleNavbar}
                                >
                                    <div className="rounded-full bg-primary-200 p-2">
                                        <img src={GraphIcon} alt="err" />
                                    </div>
                                    <span>Land Info Update</span>
                                </Link>
                                <Link
                                    to=""
                                    className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                    onClick={toggleNavbar}
                                >
                                    <div className="rounded-full bg-primary-200 p-2">
                                        <img src={GraphIcon} alt="err" />
                                    </div>
                                    <span>Land WLT Update</span>
                                </Link>
                            </>
                        )}
                        {roleName === 'Admin' && (
                            <>
                                <Link
                                    to="/landbank
                                    "
                                    className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                    onClick={toggleNavbar}
                                >
                                    <div className="rounded-full bg-primary-200 p-2">
                                        <img src={FourSquare} alt="err" />
                                    </div>
                                    <span>Data Mangement</span>
                                </Link>
                            </>
                        )}
                        <div className="border-t border-primary-400 mt-6">
                            <div className="text-primary-400 mt-5 mb-3">
                                Sales
                            </div>
                            <Link
                                to=""
                                className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                onClick={toggleNavbar}
                            >
                                <div className="rounded-full bg-primary-200 p-2">
                                    <img src={BinIcon} alt="err" />
                                </div>
                                <span>Land Sale Request</span>
                            </Link>
                            <Link
                                to=""
                                className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                onClick={toggleNavbar}
                            >
                                <div className="rounded-full bg-primary-200 p-2">
                                    <img src={PaperIcon} alt="err" />
                                </div>
                                <span>Land RETT Request</span>
                            </Link>
                        </div>
                        <div className="border-t border-primary-400 mt-6">
                            <div className="text-primary-400 mt-5 mb-3">
                                Investment Team
                            </div>
                            <Link
                                to=""
                                className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                onClick={toggleNavbar}
                            >
                                <div className="rounded-full bg-primary-200 p-2">
                                    <img src={BinIcon} alt="err" />
                                </div>
                                <span>Land Status Update</span>
                            </Link>
                            <Link
                                to=""
                                className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                onClick={toggleNavbar}
                            >
                                <div className="rounded-full bg-primary-200 p-2">
                                    <img src={PaperIcon} alt="err" />
                                </div>
                                <span>Land Business Plan Update</span>
                            </Link>
                        </div>
                        <div className="border-t border-primary-400 mt-6">
                            <div className="text-primary-400 mt-5 mb-3">
                                Finance / Land Bank
                            </div>
                            <Link
                                to=""
                                className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                onClick={toggleNavbar}
                            >
                                <div className="rounded-full bg-primary-200 p-2">
                                    <img src={TickIcon} alt="err" />
                                </div>
                                <span> Record Collection / Deposit</span>
                            </Link>
                            <Link
                                to=""
                                className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                onClick={toggleNavbar}
                            >
                                <div className="rounded-full bg-primary-200 p-2">
                                    <img src={GraphIcon} alt="err" />
                                </div>
                                <span>Land New Book Value</span>
                            </Link>
                            <Link
                                to=""
                                className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                onClick={toggleNavbar}
                            >
                                <div className="rounded-full bg-primary-200 p-2">
                                    <img src={GraphIcon} alt="err" />
                                </div>
                                <span>Land Valuation Update</span>
                            </Link>
                            <Link
                                to=""
                                className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                onClick={toggleNavbar}
                            >
                                <div className="rounded-full w-[42px]  bg-primary-200 p-2">
                                    <img
                                        className="w-full h-full"
                                        src={GraphIcon}
                                        alt="err"
                                    />
                                </div>
                                <span>Land Transactional Valuation Update</span>
                            </Link>
                            <Link
                                to=""
                                className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                onClick={toggleNavbar}
                            >
                                <div className="rounded-full bg-primary-200 p-2">
                                    <img src={GraphIcon} alt="err" />
                                </div>
                                <span>Land ZAKAT Request</span>
                            </Link>
                        </div>
                        <div className="border-t border-primary-400 mt-6 mb-36">
                            <div className="text-primary-400 mt-5 mb-3">
                                Application Support
                            </div>
                            <Link
                                to=""
                                className="flex p-2 space-x-3 items-center mt-2 rounded-lg text-primary-Main text-base font-normal bg-primary-100 cursor-pointer"
                                onClick={toggleNavbar}
                            >
                                <div className="rounded-full bg-primary-200 p-2">
                                    <img src={HelpIcon} alt="err" />
                                </div>
                                <span>Help Center</span>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavBar
