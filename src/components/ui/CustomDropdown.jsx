import { useRef } from 'react'
import { useEffect } from 'react'
import useOutsideClick from '../../hooks/useClickOutside'

const CustomSelect = ({
    name,
    value,
    onChange,
    options,
    label = 'option',
    openDropdown,
    setOpenDropdown,
}) => {
    const isOpen = openDropdown === name
    // const dropdownRef = useRef(null)
    const dropdownRef = useOutsideClick(isOpen, () => setOpenDropdown(null))
    const handleSelect = (optionValue) => {
        onChange({ target: { name, value: optionValue } })
        setOpenDropdown(null)
    }

    const toggleDropdown = () => {
        if (isOpen) {
            setOpenDropdown(null)
        } else {
            setOpenDropdown(name)
        }
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpenDropdown(null)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, setOpenDropdown])
    return (
        <div
            className="relative inline-block w-full bg-white rounded-lg "
            ref={dropdownRef}
        >
            <div
                className="border border-primary-400 rounded-lg py-2 px-2 cursor-pointer justify-between flex items-center gap-2"
                onClick={toggleDropdown}
            >
                <span className="flex whitespace-nowrap text-primary-500">
                    {value && value.length > 10
                        ? value.slice(0, 12)
                        : value || `Select ${label}`}
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
                <div className="absolute mt-1 global-scroll min-w-[150px] w-full max-h-36 overflow-y-scroll rounded shadow-lg bg-white z-20">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleSelect(option.value)}
                            className={`px-4 py-2 cursor-pointer hover:bg-primary-100 ${
                                value === option.value ? 'bg-primary-300' : ''
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
