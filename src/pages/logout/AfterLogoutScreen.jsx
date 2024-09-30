import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { LoginContext } from '../../contexts/LoginContext'
import AHCLogo from '../../assets/AHCLogo.svg'

function AfterLogoutScreen() {
    const { temporarySignOut, setTemporarySignOut } = useContext(LoginContext)
    const navigate = useNavigate()
    const handleClick = () => {
        setTemporarySignOut(true)
        // navigate('/login')
        navigate('/')
    }

    return (
        <div
            className={`flex items-center justify-center h-dvh w-full fixed inset-0 bg-[#837550] bg-gradient-to-tr from-[#EFE9D8] to-[#EFE9D8]/10`}
        >
            <div className="flex flex-col items-center gap-4 bg-opacity-50 p-10 rounded-lg backdrop-blur-[4px] sm:min-w-[500px]  bg-[#837550] bg-gradient-to-tr from-[#EFE9D8] to-[#EFE9D8]/10 drop-shadow-lg">
                <img className="size-40" src={AHCLogo} alt="logo" />
                <div className="flex flex-col items-center gap-4">
                    <h3 className="text-2xl text-[#837550]">
                        You have successfully signed out.
                    </h3>
                    <p className="text-normal text-[#7A7474] ">
                        Would you like to sign in again?
                    </p>
                    <button
                        className="bg-primary px-10 py-3 text-lg rounded-lg text-[#837550] border border-[#837550] "
                        onClick={handleClick}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AfterLogoutScreen
