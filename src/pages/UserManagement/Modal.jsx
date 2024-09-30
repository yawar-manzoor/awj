import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from '../../api/axios'
import BarLoader from 'react-spinners/BarLoader'
import ClipLoader from 'react-spinners/ClipLoader'

function Modal({ setShowModal, showModal }) {
    const [rolesList, setRolesList] = useState()
    const [departmentList, setDepartmentList] = useState()
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState()
    const [showDropDown, setShowDropdown] = useState(false)
    const [role, setRole] = useState(rolesList?.[0].roleId)
    const [department, setDepartment] = useState(
        departmentList?.[0].departmentId
    )

    const [companyList, setCompanyList] = useState()
    const [company, setCompany] = useState(companyList?.[0].companyId)

    const [isAddingUser, setIsAddingUser] = useState(false)
    const [signatureFile, setSignatureFile] = useState()
    const [userDataList, setUserDataList] = useState()
    const [selectedCompanyId, setSelectedCompanyId] = useState()
    const [isLoadingDepartments, setIsLoadingDepartments] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isLoadingUsersFromAD, setIsLoadingUsersFromAD] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState(null)
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [isOpenCompany, setisOpenCompany] = useState(false)

    const handleSelectCompany = (company) => {
        setSelectedCompany(company)
        setCompany(company?.id)
        setisOpenCompany(false)
    }

    const handleSelect = (role) => {
        setSelectedRole(role)
        setRole(role?.id)
        console.log(role?.id)
        setIsOpen(false)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/Users/GetUsersFromAD', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                })
                const data = response.data

                console.log(data.data)
                setUserDataList(data.data)
            } catch (error) {
                console.error(
                    'There was a problem with the fetch operation:',
                    error
                )
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const getRoles = async () => {
            try {
                const response = await axios.get(
                    'Asset/GetStatus?statusType=roles',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                )

                // const data = await response.json()
                const data = response.data
                console.log(data.data)
                setRolesList(data.data)
            } catch (error) {
                console.error(
                    'There was a problem with the fetch operation:',
                    error
                )
            }
        }

        const getCompanys = async () => {
            try {
                const response = await axios.get(
                    'Asset/GetStatus?statusType=company',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                )

                const data = response.data
                console.log(data.data)
                setCompanyList(data.data)
                setSelectedCompanyId(data.data[0].companyId)
            } catch (error) {
                console.error(
                    'There was a problem with the fetch operation:',
                    error
                )
            }
        }
        getRoles()
        // getDepartments()
        getCompanys()
    }, [])
    console.log(selectedCompanyId)

    useEffect(() => {
        if (company) {
            const getDepartments = async () => {
                setIsLoadingDepartments(true)
                try {
                    const response = await axios.get(
                        `/Users/GetDepartment?CompanyId=${company}`,
                        {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    'token'
                                )}`,
                            },
                        }
                    )

                    const data = response.data
                    console.log(data.data)
                    setDepartmentList(data.data)
                    setIsLoadingDepartments(false)
                } catch (error) {
                    setIsLoadingDepartments(false)
                    console.error(
                        'There was a problem with the fetch operation:',
                        error
                    )
                }
            }
            getDepartments()
        }
    }, [company])

    const handleSearch = async (e) => {
        const query = e.target.value
        setIsLoadingUsersFromAD(true)
        setSearchQuery(query)

        setShowDropdown(!showDropDown)
        console.log('here')

        try {
            const response = await axios.get(
                `/Admin/GetUsersFromADByName?UserName=${query}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            const data = response.data
            console.log(data, 'now here')
            setFilteredUsers(data.data)
            setIsLoadingUsersFromAD(false)
        } catch (error) {
            setFilteredUsers([])
            setIsLoadingUsersFromAD(false)

            console.error(
                'There was a problem with the fetch operation:',
                error
            )
        }
        console.log(filteredUsers)
    }

    const handleAddUser = async () => {
        const {
            id = 'Not Specified',
            displayName = 'Not Specified',
            givenName = 'Not specified',
            surname = 'Not specified',
            userPrincipalName = 'Not specified',
            mail = 'Not specified',
            jobTitle = 'Not specified',
            mobilePhone = 'Not specified',
        } = selectedUser || {}

        let payload = {
            ADId: id,
            DisplayName: displayName,
            GivenName: givenName,
            Surname: surname,
            UserPrincipalName: userPrincipalName,
            Mail: mail,
            JobTitle: jobTitle,
            MobilePhone: mobilePhone,
            RoleId: role,
            DepartmentId: department,
            CompanyId: company,
        }

        // payload = { ...payload }
        const payloadToSend = new FormData()
        Object.entries(payload).forEach(([key, value]) => {
            payloadToSend.append(key, value)
        })
        console.log(isButtonDisabled)
        setIsAddingUser(true)

        try {
            const response = await axios.post('/Users/AddUser', payloadToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            setIsAddingUser(false)

            console.log(response, 'response data')

            if (response.status === 200) {
                toast.success('User added successfully!')
                setShowModal(!showModal)
                console.log('in if')
            } else {
                toast.error(data.responseException.exceptionMessage[0])
                console.log('in else')
            }
        } catch (error) {
            setIsAddingUser(false)

            toast.error(
                error?.response?.data?.responseException?.exceptionMessage[0]
            )
        }
    }
    const handleEditADField = (e) => {
        console.log(e.target.id)
        setSelectedUser({
            ...selectedUser,
            [e.target.id]: e.target.value,
        })
    }

    return (
        <div className="fixed flex flex-col gap-4 sm:gap-10 w-full h-full sm:h-auto sm:w-3/4 xl:w-1/2 bg-white z-[100] sm:rounded-lg shadow-xl left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-4 sm:px-10 py-10 ">
            <h1 className="text-center text-xl font-semibold underline">
                User Details
            </h1>
            <div className="w-full relative ">
                <input
                    type="text"
                    placeholder="Search User"
                    className="border py-2 px-4 rounded-lg w-full"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                {searchQuery && showDropDown && (
                    <div className="absolute top-[100%] left-0 right-0 bg-white border  rounded-lg shadow-lg mt-2 max-h-80 overflow-y-scroll ">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => {
                                        setSelectedUser(user)
                                        setShowDropdown(!showDropDown)
                                    }}
                                >
                                    {user.displayName}
                                </div>
                            ))
                        ) : isLoadingUsersFromAD &&
                          !(filteredUsers.length > 0) ? (
                            <div className="w-full flex items-center justify-center py-2">
                                <ClipLoader color="#bfa75a" size={24} />
                            </div>
                        ) : (
                            !isLoadingUsersFromAD &&
                            !(filteredUsers.length > 0) && (
                                <div className="py-2 px-4">No users found</div>
                            )
                        )}
                    </div>
                )}
            </div>

            {
                <ul className="gap-x-4 gap-y-2 w-full max-h-[500px] sm:max-h-[200px] overflow-y-scroll xl:overflow-y-auto xl:max-h-[300px]  grid grid-cols-1 xl:grid-cols-2 ">
                    <li className="flex justify-between">
                        <span className="flex-1 text-sm font-semibold">Id</span>
                        <input
                            id="id"
                            className="flex-1 border rounded-lg px-4 py-1 text-sm"
                            value={selectedUser?.id}
                            onChange={handleEditADField}
                        />
                    </li>
                    <li className="flex justify-between">
                        <span className="flex-1 text-sm font-semibold">
                            Display Name
                        </span>
                        <input
                            id="displayName"
                            className="flex-1 border rounded-lg px-4 py-1 text-sm"
                            value={selectedUser?.displayName}
                            onChange={handleEditADField}
                        />
                    </li>
                    {/* <li className="flex justify-between">
                        <span className="flex-1 text-sm font-semibold">
                            Given Name
                        </span>
                        <input
                            id="givenName"
                            className="flex-1 border rounded-lg px-4 py-1 text-sm"
                            value={selectedUser?.givenName}
                            onChange={handleEditADField}
                        />
                    </li> */}
                    <li className="flex justify-between">
                        <span className="flex-1 text-sm font-semibold">
                            Surname
                        </span>
                        <input
                            id="surname"
                            className="flex-1 border rounded-lg px-4 py-1 text-sm"
                            value={selectedUser?.surname}
                            onChange={handleEditADField}
                        />
                    </li>
                    <li className="flex justify-between">
                        <span className="flex-1 text-sm font-semibold">
                            User Principal Name
                        </span>
                        <input
                            id="userPrincipalName"
                            className="flex-1 border rounded-lg px-4 py-1 text-sm"
                            value={selectedUser?.userPrincipalName}
                            onChange={handleEditADField}
                        />
                    </li>
                    <li className="flex justify-between">
                        <span className="flex-1 text-sm font-semibold">
                            Mail
                        </span>
                        <input
                            id="mail"
                            className="flex-1 border rounded-lg px-4 py-1 text-sm"
                            value={selectedUser?.mail}
                            onChange={handleEditADField}
                        />
                    </li>
                    <li className="flex justify-between">
                        <span className="flex-1 text-sm font-semibold">
                            Job Title
                        </span>
                        <input
                            id="jobTitle"
                            className="flex-1 border rounded-lg px-4 py-1 text-sm"
                            value={selectedUser?.jobTitle}
                            onChange={handleEditADField}
                        />
                    </li>
                    <li className="flex justify-between">
                        <span className="flex-1 text-sm font-semibold">
                            Mobile Phone
                        </span>
                        <input
                            id="mobilePhone"
                            className="flex-1 border rounded-lg px-4 py-1 text-sm"
                            value={selectedUser?.mobilePhone}
                            onChange={handleEditADField}
                        />
                    </li>

                    <li className="flex justify-between">
                        <span className="flex-1 text-sm font-semibold">
                            Role
                        </span>
                        <div className="flex-1">
                            {/* <select
                                className="w-40"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option>Select Role</option>
                                {rolesList?.map((item) => (
                                    <option
                                        className="text-xs text-black "
                                        key={item?.id}
                                        value={item?.id}
                                    >
                                        {item?.status}
                                    </option>
                                ))}
                            </select> */}
                            <div
                                className="border justify-between flex border-gray-300 rounded px-2 py-1 cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {selectedRole ? (
                                    selectedRole.status
                                ) : (
                                    <span className="text-gray-500">
                                        Select Role
                                    </span>
                                )}
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
                                <div className="absolute z-10 mt-1 w-[200px] border border-gray-300 rounded bg-white shadow-md">
                                    {rolesList?.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`px-2 py-1 text-xs cursor-pointer text-black hover:bg-gray-100 ${
                                                selectedRole?.id === item.id
                                                    ? 'bg-gray-200'
                                                    : ''
                                            }`}
                                            onClick={() => handleSelect(item)}
                                        >
                                            {item.status}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </li>
                    <li className="flex justify-between">
                        <span className="flex-1 text-sm font-semibold">
                            Company
                        </span>
                        <div className="flex-1">
                            {/* <select
                                className="w-40"
                                onChange={(e) => {
                                    setCompany(e.target.value)
                                }}
                            >
                                <option>Select Company</option>
                                {companyList?.map((item) => (
                                    <option
                                        className="text-xs"
                                        key={item?.id}
                                        value={item?.id}
                                    >
                                        {item?.status}
                                    </option>
                                ))}
                            </select> */}
                            <div
                                className="border flex justify-between border-gray-300 rounded px-2 py-1 cursor-pointer"
                                onClick={() => setisOpenCompany(!isOpenCompany)}
                            >
                                {selectedCompany ? (
                                    selectedCompany.status
                                ) : (
                                    <span className="text-gray-500">
                                        Select Company
                                    </span>
                                )}
                                <svg
                                    className={`w-5 h-5 transition-transform transform ${
                                        isOpenCompany
                                            ? 'rotate-180'
                                            : 'rotate-0'
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

                            {isOpenCompany && (
                                <div className="absolute z-10 mt-1 w-[200px] border border-gray-300 rounded bg-white shadow-md">
                                    {companyList?.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`px-2 py-1 text-xs cursor-pointer text-black hover:bg-gray-100 ${
                                                selectedCompany?.id === item.id
                                                    ? 'bg-gray-200'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                handleSelectCompany(item)
                                            }
                                        >
                                            {item.status}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </li>
                    <li className="flex justify-between">
                        <span className="flex-1 text-sm font-semibold">
                            Department
                        </span>
                        <div className="flex-1 ">
                            {isLoadingDepartments ? (
                                <BarLoader />
                            ) : (
                                <select
                                    className="w-40"
                                    onChange={(e) =>
                                        setDepartment(e.target.value)
                                    }
                                >
                                    <option className="text-xs">
                                        Select Department
                                    </option>
                                    {departmentList?.map((item) => (
                                        <option
                                            key={item?.departmentId}
                                            value={item?.departmentId}
                                        >
                                            {item?.departmentNameEn}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </li>

                    {/* <li className="flex justify-between ">
                        <label
                            className="flex-1 text-sm whitespace-nowrap font-semibold"
                            htmlFor="signature"
                        >
                            Upload Signature
                        </label>
                        <div className="flex-1">
                            <input
                                onChange={(e) =>
                                    setSignatureFile(e?.target?.files?.[0])
                                }
                                id="signature"
                                type="file"
                                className="w-full text-xs"
                            />
                        </div>
                    </li> */}
                </ul>
            }
            <div className="flex justify-end gap-10 w-full">
                <button
                    onClick={() => setShowModal(!showModal)}
                    className="py-2 px-8 sm:px-10 rounded-lg border text-white bg-red-400"
                >
                    Cancel
                </button>
                <button
                    onClick={handleAddUser}
                    className={`py-2 px-8 sm:px-10 ${
                        isAddingUser && 'animate-pulse'
                    } rounded-lg   disabled:hover:cursor-not-allowed  ${
                        selectedUser === undefined
                            ? 'bg-[#837550]/70 border text-white'
                            : 'border text-white bg-primary-Main'
                    }`}
                    disabled={selectedUser === undefined}
                >
                    {isAddingUser ? 'Adding...' : 'Add'}
                </button>
            </div>
        </div>
    )
}

export default Modal
