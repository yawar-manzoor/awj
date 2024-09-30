import React from 'react'
import MicrosoftIcon from '../../assets/MicrosoftIcon.svg'
import PulseLoader from 'react-spinners/PulseLoader'

function SignInButton({ handleLoginViaMS, handleLogin, isLoadingMSLogin }) {
    return (
        <button
            onClick={() => {
                handleLogin('redirect')
            }}
            type="button"
            className="w-full bg-white text-[#EFECE4] p-2 rounded font-bold "
        >
            {isLoadingMSLogin ? (
                <PulseLoader size={10} color="#857550" />
            ) : (
                <div className="flex items-center justify-center gap-4 border p-2 rounded">
                    <img src={MicrosoftIcon} alt="icon" />
                    <span className="whitespace-nowrap text-sm 3xl:text-base font-normal text-[#7A7474]">
                        Continue with Microsoft
                    </span>
                </div>
            )}
        </button>
    )
}

export default SignInButton
