import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

const ErrorPage = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold mb-4">OOPS!</h1>
            <h1 className="text-2xl font-semibold  mb-4">
                404 - Page Not Found
            </h1>
            <p className="text-lg text-gray-600">
                The page you are looking for might not exist or is temporarily
                unavailable.
            </p>
            <Button
                className="bg-primary-Main   px-10 py-3 my-6 font-semibold rounded-[10px] text-white text-[16px] leading-[20px]"
                title="Go Back To Sign In Page"
                onClick={handleLogout}
                translationKey={'Go Back To Sign In Page'}
            />
        </div>
    )
}

export default ErrorPage
