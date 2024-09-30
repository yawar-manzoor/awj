// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { baseURL } from '../../lib/global'

// function EditDBUserModal({
//     userToBeEdited,
//     setShowEditDBUserModal,
//     showEditDBUserModal,
//     fetchData,
// }) {
//     console.log(userToBeEdited, 'checking company')

//     const [userDetails, setUserDetails] = useState({
//         fName: userToBeEdited.fName,
//         mName: userToBeEdited.mName,
//         lName: userToBeEdited.lName,
//         displayName: userToBeEdited.displayName,
//         jobTitle: userToBeEdited.jobTitle,
//         mobilePhone: userToBeEdited.mobilePhone,
//         position: userToBeEdited.position,
//         departmentId: userToBeEdited.departmentId,
//         companyId: userToBeEdited.companyId,
//     })
//     useEffect(() => {}, [])
//     console.log(userToBeEdited, 'userToBeEdited')

//     const formSubmitHandler = async (e) => {
//         e.preventDefault()
//         console.log(userDetails, 'form dataaaaaaaaaaaaaaaa')
//         const payload = { id: userToBeEdited.id, ...userDetails }
//         const url = `${baseURL}Users/UpdateUser`
//         try {
//             const response = await axios.post(url, payload, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             })
//             const data = response.data
//             console.log(data, 'postresponse')
//             toast.success('Updated Successfully')
//             fetchData()
//             setShowEditDBUserModal(!showEditDBUserModal)
//         } catch (error) {
//             console.error(
//                 'There was a problem with the update operation:',
//                 error
//             )
//             toast.error('Something Went Wrong')
//         }
//     }

//     return (
//         <div className="fixed flex flex-col gap-4 min-w-full h-full sm:h-auto sm:w-1/2 sm:min-w-[500px] xl:min-w-[600px] bg-white z-[100] sm:rounded-lg shadow-xl left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-4 sm:px-10 py-6 xl:py-10">
//             <h1 className="text-xl font-bold underline text-center">
//                 Edit User
//             </h1>
//             <form onSubmit={formSubmitHandler} className="flex flex-col gap-4">
//                 <div className="grid grid-cols-2 gap-4 ">
//                     <div className="flex flex-col gap-2">
//                         <label
//                             className="text-sm font-semibold"
//                             htmlFor="fName"
//                         >
//                             First Name
//                         </label>
//                         <input
//                             className="text-sm border px-2 py-2 rounded-lg"
//                             onChange={(e) => {
//                                 setUserDetails({
//                                     ...userDetails,
//                                     fName: e.target.value,
//                                 })
//                             }}
//                             value={userDetails.fName}
//                             id="fName"
//                             type="text"
//                         />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <label
//                             className="text-sm font-semibold"
//                             htmlFor="mName"
//                         >
//                             Middle Name
//                         </label>
//                         <input
//                             className="text-sm border px-2 py-2 rounded-lg"
//                             onChange={(e) => {
//                                 setUserDetails({
//                                     ...userDetails,
//                                     mName: e.target.value,
//                                 })
//                             }}
//                             value={userDetails.mName}
//                             id="mName"
//                             type="text"
//                         />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <label
//                             className="text-sm font-semibold"
//                             htmlFor="lName"
//                         >
//                             Last Name
//                         </label>
//                         <input
//                             className="text-sm border px-2 py-2 rounded-lg"
//                             onChange={(e) => {
//                                 setUserDetails({
//                                     ...userDetails,
//                                     lName: e.target.value,
//                                 })
//                             }}
//                             value={userDetails.lName}
//                             id="lName"
//                             type="text"
//                         />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <label
//                             className="text-sm font-semibold"
//                             htmlFor="displayname"
//                         >
//                             Display Name
//                         </label>
//                         <input
//                             className="text-sm border px-2 py-2 rounded-lg"
//                             onChange={(e) => {
//                                 setUserDetails({
//                                     ...userDetails,
//                                     displayName: e.target.value,
//                                 })
//                             }}
//                             value={userDetails.displayName}
//                             id="displayname"
//                             type="text"
//                         />
//                     </div>

//                     <div className="flex flex-col gap-2">
//                         <label
//                             className="text-sm font-semibold"
//                             htmlFor="jobtitle"
//                         >
//                             Job Title
//                         </label>
//                         <input
//                             className="text-sm border px-2 py-2 rounded-lg"
//                             onChange={(e) => {
//                                 setUserDetails({
//                                     ...userDetails,
//                                     jobTitle: e.target.value,
//                                 })
//                             }}
//                             value={userDetails.jobTitle}
//                             id="jobtitle"
//                             type="text"
//                         />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <label
//                             className="text-sm font-semibold"
//                             htmlFor="mobilephone"
//                         >
//                             Mobile Phone
//                         </label>
//                         <input
//                             className="text-sm border px-2 py-2 rounded-lg"
//                             onChange={(e) => {
//                                 setUserDetails({
//                                     ...userDetails,
//                                     mobilePhone: e.target.value,
//                                 })
//                             }}
//                             value={userDetails.mobilePhone}
//                             id="mobilephone"
//                             type="text"
//                         />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <label
//                             className="text-sm font-semibold"
//                             htmlFor="position"
//                         >
//                             Position
//                         </label>
//                         <input
//                             className="text-sm border px-2 py-2 rounded-lg"
//                             onChange={(e) => {
//                                 setUserDetails({
//                                     ...userDetails,
//                                     position: e.target.value,
//                                 })
//                             }}
//                             value={userDetails.position}
//                             id="position"
//                             type="text"
//                         />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <label className="text-sm font-semibold" htmlFor="did">
//                             Department ID
//                         </label>
//                         <input
//                             className="text-sm border px-2 py-2 rounded-lg"
//                             onChange={(e) => {
//                                 setUserDetails({
//                                     ...userDetails,
//                                     departmentId: e.target.value,
//                                 })
//                             }}
//                             value={userDetails.departmentId}
//                             id="did"
//                             type="text"
//                         />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <label className="text-sm font-semibold" htmlFor="cid">
//                             Company ID
//                         </label>
//                         <input
//                             className="text-sm border px-2 py-2 rounded-lg"
//                             onChange={(e) => {
//                                 setUserDetails({
//                                     ...userDetails,
//                                     companyId: e.target.value,
//                                 })
//                             }}
//                             value={userDetails.companyId}
//                             id="cid"
//                             type="text"
//                         />
//                     </div>
//                 </div>
//                 <div className="flex gap-10 self-end">
//                     <button
//                         className="py-2 px-6 rounded-lg border bg-red-400 text-white"
//                         type="button"
//                         onClick={() =>
//                             setShowEditDBUserModal(!showEditDBUserModal)
//                         }
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         className="py-2 px-6 rounded-lg border text-white bg-primary-Main"
//                         type="submit"
//                     >
//                         Submit
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default EditDBUserModal
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { baseURL } from '../../lib/global'

function EditDBUserModal({
    userToBeEdited,
    setShowEditDBUserModal,
    showEditDBUserModal,
    fetchData,
}) {
    const [userDetails, setUserDetails] = useState({
        fName: userToBeEdited.fName,
        mName: userToBeEdited.mName,
        lName: userToBeEdited.lName,
        displayName: userToBeEdited.displayName,
        jobTitle: userToBeEdited.jobTitle,
        mobilePhone: userToBeEdited.mobilePhone,
        position: userToBeEdited.position,
        departmentId: userToBeEdited.departmentId,
        companyId: userToBeEdited.companyId,
    })
    const [companies, setCompanies] = useState([])
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        // Fetch companies when the component loads
        const fetchCompanies = async () => {
            try {
                const response = await fetch(
                    `${baseURL}Asset/GetStatus?statusType=company`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                )
                const data = await response.json()
                setCompanies(data.data)
                console.log(data?.data, 'in company', response)
            } catch (error) {
                console.error('Error fetching companies:', error)
                toast.error('Error fetching companies')
            }
        }

        // Fetch departments for the selected company
        // const fetchDepartments = async (companyId) => {
        //     try {
        //         const response = await axios.get(
        //             `${baseURL}/companies/${companyId}/departments`
        //         )
        //         setDepartments(response.data)
        //     } catch (error) {
        //         console.error('Error fetching departments:', error)
        //         toast.error('Error fetching departments')
        //     }
        // }

        fetchCompanies()
    }, [userDetails.companyId])

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        const payload = { id: userToBeEdited.id, ...userDetails }
        const url = `${baseURL}Users/UpdateUser`

        try {
            const response = await axios.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            toast.success('Updated Successfully')
            fetchData()
            setShowEditDBUserModal(!showEditDBUserModal)
        } catch (error) {
            console.error(
                'There was a problem with the update operation:',
                error
            )
            toast.error('Something Went Wrong')
        }
    }

    return (
        <div className="fixed flex flex-col gap-4 min-w-full h-full sm:h-auto sm:w-1/2 sm:min-w-[500px] xl:min-w-[600px] bg-white z-[100] sm:rounded-lg shadow-xl left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-4 sm:px-10 py-6 xl:py-10">
            <h1 className="text-xl font-bold underline text-center">
                Edit User
            </h1>
            <form onSubmit={formSubmitHandler} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-semibold"
                            htmlFor="fName"
                        >
                            First Name
                        </label>
                        <input
                            className="text-sm border px-2 py-2 rounded-lg"
                            onChange={(e) => {
                                setUserDetails({
                                    ...userDetails,
                                    fName: e.target.value,
                                })
                            }}
                            value={userDetails.fName}
                            id="fName"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-semibold"
                            htmlFor="mName"
                        >
                            Middle Name
                        </label>
                        <input
                            className="text-sm border px-2 py-2 rounded-lg"
                            onChange={(e) => {
                                setUserDetails({
                                    ...userDetails,
                                    mName: e.target.value,
                                })
                            }}
                            value={userDetails.mName}
                            id="mName"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-semibold"
                            htmlFor="lName"
                        >
                            Last Name
                        </label>
                        <input
                            className="text-sm border px-2 py-2 rounded-lg"
                            onChange={(e) => {
                                setUserDetails({
                                    ...userDetails,
                                    lName: e.target.value,
                                })
                            }}
                            value={userDetails.lName}
                            id="lName"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-semibold"
                            htmlFor="displayname"
                        >
                            Display Name
                        </label>
                        <input
                            className="text-sm border px-2 py-2 rounded-lg"
                            onChange={(e) => {
                                setUserDetails({
                                    ...userDetails,
                                    displayName: e.target.value,
                                })
                            }}
                            value={userDetails.displayName}
                            id="displayname"
                            type="text"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-semibold"
                            htmlFor="jobtitle"
                        >
                            Job Title
                        </label>
                        <input
                            className="text-sm border px-2 py-2 rounded-lg"
                            onChange={(e) => {
                                setUserDetails({
                                    ...userDetails,
                                    jobTitle: e.target.value,
                                })
                            }}
                            value={userDetails.jobTitle}
                            id="jobtitle"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-semibold"
                            htmlFor="mobilephone"
                        >
                            Mobile Phone
                        </label>
                        <input
                            className="text-sm border px-2 py-2 rounded-lg"
                            onChange={(e) => {
                                setUserDetails({
                                    ...userDetails,
                                    mobilePhone: e.target.value,
                                })
                            }}
                            value={userDetails.mobilePhone}
                            id="mobilephone"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-semibold"
                            htmlFor="position"
                        >
                            Position
                        </label>
                        <input
                            className="text-sm border px-2 py-2 rounded-lg"
                            onChange={(e) => {
                                setUserDetails({
                                    ...userDetails,
                                    position: e.target.value,
                                })
                            }}
                            value={userDetails.position}
                            id="position"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-semibold"
                            htmlFor="company"
                        >
                            Company
                        </label>
                        <select
                            className="text-sm border px-2 py-2 rounded-lg"
                            value={userDetails.companyId}
                            onChange={(e) => {
                                setUserDetails({
                                    ...userDetails,
                                    companyId: e.target.value,
                                })
                            }}
                            id="company"
                        >
                            <option value="">Select a Company</option>
                            {companies &&
                                companies?.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.status}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            className="text-sm font-semibold"
                            htmlFor="department"
                        >
                            Department
                        </label>
                        <select
                            className="text-sm border px-2 py-2 rounded-lg"
                            value={userDetails.departmentId}
                            onChange={(e) => {
                                setUserDetails({
                                    ...userDetails,
                                    departmentId: e.target.value,
                                })
                            }}
                            id="department"
                            disabled={!departments.length}
                        >
                            <option value="">Select a Department</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex gap-10 self-end">
                    <button
                        className="py-2 px-6 rounded-lg border bg-red-400 text-white"
                        type="button"
                        onClick={() =>
                            setShowEditDBUserModal(!showEditDBUserModal)
                        }
                    >
                        Cancel
                    </button>
                    <button
                        className="py-2 px-6 rounded-lg border text-white bg-primary-Main"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditDBUserModal
