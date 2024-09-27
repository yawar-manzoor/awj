import { ChevronRight, Home } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeIconSvg from '../assets/HomeIcon.svg'
import { useSelector } from 'react-redux'

function BreadCrumbs() {
    const location = useLocation()
    // const routes =
    //     location.pathname === '/' ? undefined : location.pathname.split('/')

    const routes = useSelector((state) => state.breadcrumb.breadcrumbRoutes)
    const navigate = useNavigate()

    const createNavigationString = (pagename) => {
        const { pathname } = window.location

        const pageIndex = pathname.indexOf(`/${pagename}`)

        if (pageIndex !== -1) {
            return pathname.slice(0, pageIndex + pagename.length + 1)
        }

        return ''
    }

    return (
        <ul className="flex items-center gap-2 px-12 2xl:px-24 text-[16px]  pt-8 pb-3">
            <li
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate('/landbank')}
            >
                <img src={HomeIconSvg} alt="home-icon" />
                <span className="text-[#837550]">Homepage</span>
                {routes.length !== 0 && (
                    <ChevronRight className="w-4 h-4 text-[#837550]" />
                )}
            </li>
            {routes &&
                routes?.map((item, index) => (
                    <li
                        key={index}
                        className={`cursor-pointer flex items-center gap-2 ${
                            index !== routes.length - 1
                                ? 'text-[#837550]'
                                : 'text-[#837550] font-bold pointer-events-none'
                        }`}
                    >
                        <span>{item}</span>
                        {index !== routes.length - 1 && (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </li>
                ))}
        </ul>
    )
}

export default BreadCrumbs
