import { useNavigate } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import Button from './ui/Button'
import { Key, LogOut, User } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'

function SignOutModal({ showSignOutModal, setShowSignOutModal }) {
    const navigate = useNavigate()
    const { instance } = useMsal()

    const handleLogoutRedirect = () => {
        setShowSignOutModal(!showSignOutModal)

        navigate('/logout', { replace: true })
        sessionStorage.clear()
        localStorage.clear()
        // setShowSignOutModal(!showSignOutModal)
        // navigate('/', { replace: true })
    }
    const handleLogout = () => {
        localStorage.clear()
        setShowSignOutModal(!showSignOutModal)
        navigate('/', { replace: true })
    }
    return (
        <div className=" bg-white absolute z-30 right-0 top-[100%]  mt-2 rounded-lg drop-shadow-md py-[10px]">
            {/* <Link
                to="/profile"
                className={`inline-flex hover:bg-navActive py-2 px-5 w-full border-b    cursor-pointer items-center gap-2 `}
            >
                <User className="text-sm text-neutral600" />
                <Button className="text-neutral600 text-base pr-4 font-normal whitespace-nowrap">
                    Profile
                </Button>
            </Link> */}
            {/* <div>
                <Link
                    to="/change-password"
                    className={`inline-flex hover:bg-navActive py-2 px-5 w-full border-b    cursor-pointer items-center gap-2 `}
                >
                    <Key />

                    <Button className="text-neutral600 text-base font-normal pr-4 whitespace-nowrap">
                        Change Password
                    </Button>
                </Link>
            </div> */}
            <div
                className={`inline-flex hover:bg-navActive py-2 px-5 w-full    cursor-pointer items-center gap-2 `}
                onClick={handleLogoutRedirect}
            >
                <LogOut className="text-sm text-neutral600 rotate-180" />
                <Button className="text-neutral600 text-base pr-4 font-normal whitespace-nowrap">
                    SignOut
                </Button>
            </div>
        </div>
    )
}

export default SignOutModal
