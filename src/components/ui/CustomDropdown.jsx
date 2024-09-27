import { useState } from 'react'

const CustomSelect = ({ name, value, onChange, options, label = 'option' }) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleSelect = (optionValue) => {
        onChange({ target: { name, value: optionValue } })
        setIsOpen(false)
    }

    return (
        <div className="relative inline-block w-full  bg-white rounded-lg ">
            <div
                className="border border-primary-400 rounded-lg py-2 px-4 cursor-pointer justify-between flex items-center gap-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex whitespace-nowrap text-primary-500 ">
                    {value && value?.split('').length > 10
                        ? value.slice(0, 12)
                        : value || `Select ${label}`}
                    {/* {value || `Select ${label}`} */}
                </span>
                <svg
                    className={`w-5 h-5 transition-transform transform ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#AEA07A"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
            {isOpen && (
                <div className="absolute mt-1 global-scroll min-w-[150px] w-full max-h-36 overflow-y-scroll  rounded shadow-lg bg-white z-20">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleSelect(option.value)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                value === option.value ? 'bg-gray-200' : ''
                            }`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CustomSelect
