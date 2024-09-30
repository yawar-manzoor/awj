import Input from '../../components/ui/Input'
import Label from '../../components/ui/Label'
import Button from '../../components/ui/Button'
import PulseLoader from 'react-spinners/PulseLoader'
import useLogin from './useLogin'
// import LanguageSwitcher from './LanguageSwitcher'
// import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// import { Eye, EyeOff } from 'lucide-react'
import MapPinLoginImage from '../../assets/MapPinLoginImage'
import SignInButton from '../../components/MSAL/SignInButton'
import { loginRequest } from '../../../authConfig'
import { useContext } from 'react'
import { LoginContext } from '../../contexts/LoginContext'
import { useMsal } from '@azure/msal-react'
import TourPopUp from '../../components/TourPopup'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoadingMSLogin, setIsLoadingMSLogin] = useState(false)
    const [showTourPopup, setShowTourPopup] = useState(false)
    const { instance, accounts } = useMsal()

    // const { t, i18n } = useTranslation()
    const { temporarySignOut, setTemporarySignOut } = useContext(LoginContext)

    const { handleSubmitViaMS, handleSubmitViaEmailPassword, mutation } =
        useLogin()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    // useEffect(() => {
    //     i18n.changeLanguage('en')

    //     localStorage.setItem('language', 'en')
    // }, [i18n])
    // const langFromLocalStorage = localStorage.getItem('newlang')
    // const isarLanguage = langFromLocalStorage === 'ar'

    const fetchToken = async () => {
        try {
            let data = await instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            let email = window.btoa(data.account.username)

            console.log(email)

            if (email) {
                handleSubmitViaMS(email)
                setIsLoadingMSLogin(false)
            }
        } catch (error) {
            setIsLoadingMSLogin(false)

            console.log(error, 'oh noooooooooooooooooooooo')
        }
    }

    const handleLogin = async (loginType) => {
        setIsLoadingMSLogin(true)

        if (loginType === 'popup') {
            instance
                .loginPopup(loginRequest)
                .then(fetchToken)
                .catch((e) => {
                    console.log(e)
                })
        } else if (loginType === 'redirect') {
            instance
                .loginRedirect(loginRequest)
                .then(() => console.log(''))
                .catch((e) => {
                    console.log(e)
                })
        }
    }

    const handleRedirectResponse = async () => {
        try {
            const response = await instance.handleRedirectPromise()
            console.log(response, 'handleRedirectResponse')

            if (response !== null) {
                setIsLoadingMSLogin(false)

                fetchToken()
            }
        } catch (e) {
            setIsLoadingMSLogin(false)

            // console.log(e)
        }
    }

    useEffect(() => {
        if (!temporarySignOut) {
            handleRedirectResponse()
        }
    }, [])

    return (
        <div className="flex flex-col relative w-full h-dvh bg-white bg-gradient-to-bl from-[#EFE9D8] to-[#EFE9D8]/10">
            <div className="flex-[4]  relative ">
                <div className="absolute flex top-10 right-10 gap-3">
                    <button className="py-2 3xl:py-3 px-4 text-sm 3xl:text-base font-semibold border-[#837550] border  text-[#837550] rounded-lg">
                        Help.?
                    </button>
                    <button
                        onClick={() => setShowTourPopup(true)}
                        className="py-2 3xl:py-3 px-4 text-sm 3xl:text-base font-semibold bg-[#837550] text-[#FAFAFA] rounded-lg"
                    >
                        Take a tour
                    </button>
                    {showTourPopup && (
                        <TourPopUp closePopUp={setShowTourPopup} />
                    )}
                </div>
            </div>
            <div className="flex-[6]    bg-[url('./assets/LoginBg.png')] bg-cover relative ">
                <MapPinLoginImage customClassName="absolute w-[120px] h-[180px] 3xl:w-[150px] 3xl:h-[244px] left-10 bottom-10 " />
                <MapPinLoginImage customClassName="absolute w-[120px] h-[180px] 3xl:w-[150px] 3xl:h-[244px] right-48 bottom-32" />
                <MapPinLoginImage customClassName="absolute left-48 3xl:left-96 -top-20 w-16" />
                <MapPinLoginImage customClassName="absolute right-48 3xl:right-96 -top-20 w-16" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col gap-6 3xl:gap-12 w-1/2 bg-white p-6 3xl:p-12 rounded-2xl  border max-w-[480px] 3xl:max-w-[548px]">
                <div className="flex flex-col gap-3 3xl:gap-6 items-center">
                    <h3 className="text-[#837550] font-black text-2xl 3xl:text-3xl">
                        User Login
                    </h3>
                    <p className="text-lg 3xl:text-xl font-medium text-[#9E8D60] text-center">
                        Hey, Enter your details to get login
                        <br />
                        to your account
                    </p>
                </div>
                <form
                    className="flex flex-col gap-5 3xl:gap-9"
                    onSubmit={(e) => handleSubmitViaEmailPassword(e)}
                >
                    <div className="flex flex-col gap-3">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter Username / Email"
                            className="p-4 text-sm 3xl:text-base rounded-lg border border-[#BEB395] placeholder:text-sm 3xl:placeholder:text-base  placeholder:font-normal placeholder:text-[#7A7474] w-full focus:outline-none"
                            required
                        />

                        <div className="">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter Password"
                                required
                                className="p-4 text-sm 3xl:text-base rounded-lg border border-[#BEB395] placeholder:text-sm 3xl:placeholder:text-base  placeholder:font-normal placeholder:text-[#7A7474] w-full focus:outline-none"
                            />
                            <div
                                className={`cursor-pointer absolute top-[45px]

                                    `}
                                onClick={togglePasswordVisibility}
                            ></div>
                        </div>
                        <p className="text-[#7A7474] text-sm 3xl:text-base font-normal">
                            Having trouble in sign in.?{' '}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 3xl:gap-8">
                        <Button
                            type="submit"
                            className="w-full bg-primary-Main text-[#EFECE4] p-2 rounded font-bold "
                        >
                            {mutation.isPending ? (
                                <PulseLoader size={10} color="#FFFFFF" />
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                        <p className="text-center text-sm 3xl:text-base text-[#655F5F] font-medium">
                            -- Or Sign in with --
                        </p>
                        <SignInButton
                            handleSubmitViaMS={handleSubmitViaMS}
                            handleLogin={handleLogin}
                            isLoadingMSLogin={isLoadingMSLogin}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
