import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ImportantDetails = () => {
    const [detailsExist, setDetailsExist] = useState(false)
    const [groups, setGroups] = useState([])
    const [branches, setBranches] = useState([])
    const [batches, setBatches] = useState([])
    const [isLateralEntry, setIsLateralEntry] = useState(false)
    const navigate = useNavigate()
    const host = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${host}/student/other-details/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                const data = await response.json()
                // Check if all details exist
                if (response.ok && data.batch && data.group && data.branch && data.is_lateral_entry) {
                    setDetailsExist(true)
                    navigate('/dashboard')
                }
            } catch (error) {
                console.error('Error fetching details:', error)
            }
        }

        const fetchGroups = async () => {
            try {
                const response = await fetch(`${host}/groups/get-all/`)
                const data = await response.json()
                setGroups(data.groups ? data.groups : [])
            } catch (error) {
                console.error('Error fetching groups:', error)
            }
        }

        const fetchBranches = async () => {
            try {
                const response = await fetch(`${host}/branches/get-all/`)
                const data = await response.json()
                setBranches(data.branches ? data.branches : [])
            } catch (error) {
                console.error('Error fetching branches:', error)
            }
        }

        const fetchBatches = async () => {
            try {
                const response = await fetch(`${host}/batches/get-all/`)
                const data = await response.json()
                setBatches(data.batches ? data.batches : [])
            } catch (error) {
                console.error('Error fetching batches:', error)
            }
        }


        fetchGroups()
        fetchBranches()
        fetchBatches()
        fetchDetails()
    }, [])

    const handleInputChange = (e) => {
        const { name, checked } = e.target
        if (name === 'isLateralEntry') {
            setIsLateralEntry(checked)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await fetch(`${host}/student/other-details/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    batch: e.target.batch.value,
                    group: e.target.group.value,
                    branch: e.target.branch.value,
                    is_lateral_entry: isLateralEntry,
                }),
            })
            if (response.ok) {
                
                setDetailsExist(true)
                navigate('/dashboard')
            } else {
                // Handle error response, maybe show an error message
                console.error('Error submitting details:', response.statusText)
            }
        } catch (error) {
            console.error('Error submitting details:', error)
        }
    }

    return (
        <div className='max-w-3xl mx-auto'>
            <h1 className='text-lg w-fit px-2 py-1 text-blue-700 font-semibold border-b-2 pb-4'>Important Details</h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">Please double-check and make sure your information is correct as it will be used for future reference.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Group:
                    <select name="group" className="form-select mt-1 block w-full">
                        <option value="">Select Group</option>
                        {groups.map((group, index) => (
                            <option key={index} value={group}>{group}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Select Branch:
                    <select name="branch" className="form-select mt-1 block w-full">
                        <option value="">Select Branch</option>
                        {branches.map(branch => (
                            <option key={branch.id} value={branch.id}>{branch}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Select Batch:
                    <select name="batch" className="form-select mt-1 block w-full">
                        <option value="">Select Batch</option>
                        {batches.map(batch => (
                            <option key={batch.id} value={batch.id}>{batch}</option>
                        ))}
                    </select>
                </label>
                <label className="inline-flex items-center mt-4">
                    <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-indigo-600"
                        name="isLateralEntry"
                        checked={isLateralEntry}
                        onChange={handleInputChange}
                    />
                    <span className="ml-2 text-gray-700 font-semibold">Is Lateral Entry</span>
                </label>
                <button
                    type="submit"
                    className="w-32 mt-4 block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit
                </button>
                <br />
            </form>
        </div>
    )
}

export default ImportantDetails
