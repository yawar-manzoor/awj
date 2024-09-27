import { useEffect, useState } from 'react'
import BreadCrumbs from '../components/BreadCrumbs'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearState, popRoute } from '../features/breadcrumbSlice'

const Layout = () => {
    const location = useLocation()
    const pathname = location.pathname
    const dispatch = useDispatch()

    const breadcrumbRoutes = useSelector(
        (state) => state.breadcrumb.breadcrumbRoutes
    )
    console.log(breadcrumbRoutes, pathname, 'frfgj')

    useEffect(() => {
        if (pathname === '/landbank') {
            dispatch(clearState())
        }
        if (pathname === '/analytics' && breadcrumbRoutes.length === 2) {
            dispatch(popRoute())
        }
        console.log('mounted')
    }, [pathname])

    return (
        <>
            <nav>
                <Header />
            </nav>
            <main className="py-4">
                {pathname !== '/landbank' && pathname !== '/view-all' && (
                    <BreadCrumbs />
                )}
                <Outlet />
            </main>
        </>
    )
}

export default Layout
