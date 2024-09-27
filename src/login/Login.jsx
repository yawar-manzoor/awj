import Input from '../components/ui/Input'
import Label from '../components/ui/Label'
import Button from '../components/ui/Button'
import PulseLoader from 'react-spinners/PulseLoader'
import useLogin from './useLogin'
// import LanguageSwitcher from './LanguageSwitcher'
// import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
// import Logo_Das from '../../assets/Logo-Das.png'

export default function Login() {
    const { handleSubmit, mutation } = useLogin()
    const [showPassword, setShowPassword] = useState(false)
    // const { t, i18n } = useTranslation()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    // useEffect(() => {
    //     i18n.changeLanguage('en')

    //     localStorage.setItem('language', 'en')
    // }, [i18n])
    // const langFromLocalStorage = localStorage.getItem('newlang')
    // const isarLanguage = langFromLocalStorage === 'ar'
    console.log(mutation.isLoading)

    return (
        <div className="    flex justify-center bg-primary items-center h-screen   ">
            {/* <div className='w-1/2 hidden xl:block '>
        <img
          src={Logo_Das}
          alt='Logo'
          className='w-screen h-[95vh] object-cover rounded-2xl'
        />
      </div> */}
            <div className="  bg-white py-10 rounded-2xl md:px-10 sm:px-10 px-3">
                <h1
                    className={`text-xl md:text-[28px] font-bold text-[#2A3547] pb-0 md:pb-4 `}
                >
                    Welcome to AWJ Land Bank Hub
                </h1>
                {/* <div className="flex w-full items-center mb-5 ">
                    <LanguageSwitcher />
                </div> */}
                <div
                    // dir={i18n.dir()}
                    className=" bg-white md:w-[500px] w-[300px] sm:w-[350px]  pt-5  rounded-2xl"
                >
                    <div>
                        <form
                            className="flex flex-col "
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <Label
                                htmlFor="email"
                                className="text-[#2A3547] font-semibold pb-2 text-sm"
                            >
                                User Name
                                {/* Username */}
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter Email"
                                className="rounded-[7px] border mb-5 border-[#DFE5EF] bg-white p-3  focus-visible:outline-2  no-outline"
                                required
                            />
                            <div className="flex flex-col relative">
                                <Label
                                    htmlFor="password"
                                    className="text-[#2A3547] font-semibold pb-2 text-sm"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter Password"
                                    required
                                    className="rounded-[7px] border mb-5 border-[#DFE5EF] bg-white p-3  focus-visible:outline-2  no-reveal no-outline"
                                />
                                <div
                                    className={`cursor-pointer absolute top-[45px]

                                    `}
                                    onClick={togglePasswordVisibility}
                                ></div>
                            </div>
                            {mutation.isPending && (
                                <div className="bg-primary-Main px-20 p-2 text-center mt-5 rounded-lg">
                                    <PulseLoader color="white" size={10} />
                                </div>
                            )}

                            {!mutation.isPending && (
                                <Button
                                    type="submit"
                                    className="w-full bg-primary-Main text-white p-2 rounded  t mt-5"
                                >
                                    Sign In
                                </Button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
