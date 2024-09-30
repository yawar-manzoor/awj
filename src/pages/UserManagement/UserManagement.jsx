import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import axios from '../../api/axios'
import { Edit2 } from 'lucide-react'
import EditDBUserModal from './EditDBUserModal'
import { Search } from 'lucide-react'
import PaginationBar from './PaginationBar'
import { t } from 'i18next'
import ToggleActiveStateModal from './ToggleActiveStateModal'
import { PlusCircleIcon } from 'lucide-react'
import Loader from '../../components/ui/Loader'
const UserManagement = () => {
    const [addingUser, setAddingUser] = useState(false)
    const [dbUsers, setDbUsers] = useState()
    const [showModal, setShowModal] = useState(false)
    const [showEditDBUserModal, setShowEditDBUserModal] = useState(false)
    const [userToBeEdited, setUserToBeEdited] = useState()
    const [isUpdatingUser, setIsUpdatingUser] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [showActiveStateModal, setShowActiveStateModal] = useState(null)
    const [isLoadingUsers, setIsLoadingUsers] = useState(true)

    const handleUserActiveState = (userid) => {
        setShowActiveStateModal((prev) => (prev === userid ? null : userid))
    }
    const fetchData = async (searchQuery) => {
        try {
            const response = await axios.get(
                `/Admin/GetUsersForAdmin?search=${searchQuery}&pageNo=${currentPageNumber}&pageSize=10`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            const data = response.data

            // const data = await response.json()
            console.log(data)
            setDbUsers(data)
            setIsLoadingUsers(false)
        } catch (error) {
            setIsLoadingUsers(false)

            console.error(
                'There was a problem with the fetch operation:',
                error
            )
        }
    }

    useEffect(() => {
        fetchData(searchQuery)
    }, [currentPageNumber, searchQuery])

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    console.log(dbUsers?.data)

    return (
        <div className="px-12">
            <div className="relative flex flex-col bg-white px-4 py-6 gap-6 rounded-2xl">
                {showModal && (
                    <div
                        onClick={() => setShowModal(!showModal)}
                        className="fixed w-screen h-dvh bg-black/50 z-50 inset-0 "
                    ></div>
                )}
                {showModal && (
                    <Modal setShowModal={setShowModal} showModal={showModal} />
                )}
                {showEditDBUserModal && (
                    <div
                        onClick={() =>
                            setShowEditDBUserModal(!showEditDBUserModal)
                        }
                        className="fixed w-screen h-dvh bg-black/50 z-50 inset-0 "
                    ></div>
                )}
                {showEditDBUserModal && (
                    <EditDBUserModal
                        userToBeEdited={userToBeEdited}
                        setShowEditDBUserModal={setShowEditDBUserModal}
                        showEditDBUserModal={showEditDBUserModal}
                        fetchData={fetchData}
                    />
                )}
                <div className="w-full b flex items-center justify-end gap-4">
                    <div className="flex items-center gap-2 border border-primary py-2 px-3 rounded-lg">
                        <Search className="text-primary" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className=""
                            onChange={handleSearch}
                        />
                    </div>

                    <button
                        onClick={() => setShowModal(!showModal)}
                        className="flex items-center gap-3 bg-primary-Main py-2 px-6 rounded-md bg-primary text-white self-end"
                    >
                        Add
                        <PlusCircleIcon />
                    </button>
                </div>

                {isLoadingUsers ? (
                    <Loader />
                ) : (
                    <table className="rounded-lg overflow-hidden border-separate border-spacing-y-4 ">
                        <thead className="text-sm text-gray-500 font-normal">
                            <tr className="">
                                <th className=" py-2 font-semibold text-[#737480]">
                                    Name
                                </th>
                                <th className=" py-2 font-semibold text-[#737480]">
                                    Email
                                </th>
                                <th className=" py-2 font-semibold text-[#737480]">
                                    Job Title
                                </th>
                                <th className=" py-2 font-semibold text-[#737480]">
                                    Phone Number
                                </th>
                                <th className=" py-2 font-semibold text-[#737480]">
                                    Status
                                </th>
                                <th className=" py-2 font-semibold text-[#737480]">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="border">
                            {dbUsers?.data.map((row) => (
                                <tr key={row.id} className="text-base">
                                    <td className="text-center py-2 bg-[#EFECE4]/40 rounded-s-xl ">
                                        {row.displayName}
                                    </td>
                                    <td className="text-center py-2  bg-[#EFECE4]/40 ">
                                        {row.email}
                                    </td>
                                    <td className="text-center py-2 bg-[#EFECE4]/40 ">
                                        {row.jobTitle}
                                    </td>

                                    <td className="text-center py-2 bg-[#EFECE4]/40 ">
                                        {row.mobilePhone}
                                    </td>
                                    <td className="relative text-center py-2 bg-[#EFECE4]/40 ">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={row.isActive}
                                                onChange={() =>
                                                    handleUserActiveState(
                                                        row.id
                                                    )
                                                }
                                            />
                                            <div
                                                class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[#837550] rounded-full peer dark:bg-gray-700
                                             peer-checked:after:translate-x-full
                                              rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
                                               after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 
                                               after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600
                                                peer-checked:bg-[#837550]"
                                            ></div>
                                            <span className="ms-3 text-sm   font-medium text-gray-900 dark:text-gray-700">
                                                {row.isActive
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </span>
                                        </label>
                                        {showActiveStateModal === row.id && (
                                            <ToggleActiveStateModal
                                                isActive={row.isActive}
                                                setShowActiveStateModal={
                                                    setShowActiveStateModal
                                                }
                                                fetchUpdatedUsers={fetchData}
                                                userId={row.id}
                                            />
                                        )}
                                    </td>
                                    <td className="flex justify-center py-2 bg-[#EFECE4]/40  rounded-e-xl">
                                        <button
                                            onClick={() => {
                                                setShowEditDBUserModal(
                                                    !showEditDBUserModal
                                                )
                                                setUserToBeEdited(row)
                                            }}
                                            className="px-4 py-2 rounded-md bg-primary-Main text-white flex items-center gap-2"
                                        >
                                            <span className="text-white  rounded ">
                                                Edit
                                            </span>
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <PaginationBar
                    totalCount={dbUsers?.totalCount}
                    currentPageNumber={currentPageNumber}
                    setCurrentPageNumber={setCurrentPageNumber}
                />
            </div>
        </div>
    )
}

export default UserManagement
