
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EmployeeSidePanel from './EmployeeSidePanel';

const EmployeeDashboard = ({user}) => {
  const accessToken = localStorage.getItem('accessToken');
  const [formFilled, setFormFilled] = useState(false);
  const [student, setStudent] = useState(null);
  const host = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    axios.get(`${host}/student/personal-details/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        setStudent(response.data);
        if (response.status === 204) {
          // If status is 204, set formFilled to false
          setFormFilled(false);

        } else if (response.data.pancard !== null) {
          // If response.data.pancard is not null, set formFilled to true
          setFormFilled(true);
        } else {
          // In all other cases, set formFilled to false
          setFormFilled(false);
        }
        // Now you can use the formFilled value as needed
        // For example, you can log it or use it in your application logic
        console.log('formFilled:', formFilled);
      })

      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [accessToken, formFilled]);
  return (
    <div className='bg-slate-300'>

    <div className="p-5  w-[90%] m-auto">
      <div className='flex gap-10'>
      <div className="mb-8 w-fit">
        <Link to={'/dashboard'} ><h1 className="text-xl hover:bg-gray-100 text-blue-900  w-fit p-2 rounded font-semibold  bg-gray-200">Dashboard</h1></Link>
      </div>
      

      </div>
      <div className='flex gap-8'>
        {formFilled ? (
          <div>
            <EmployeeSidePanel />
          </div>
        ) : (<></>)}
        <>
          {formFilled ? (
            <>
              <div>
                <table className="table h-">
                  <tbody>
                    <tr className="border-b-2 border-gray-500">
                      <th className="px-2 py-2 border-r-2 font-semibold border-gray-500">Name</th>
                      <td className="px-2">{user.name}</td>
                    </tr>
                   
                    {/* Add more details as needed */}
                    <tr className="border-b-2 border-gray-500">
                      <th className="py-2 px-2 border-r-2 font-semibold border-gray-500">Enrollment Number</th>
                      <td className="px-2">{student.enrollment_number}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div>
                <table className="table">
                  <tbody>
                    <tr className="border-b-2 border-gray-500">
                      <th className="px-2 py-2 border-r-2 font-semibold border-gray-500">Name</th>
                      <td className="px-2">{user.name}</td>
                    </tr>
                   

                  </tbody>
                </table>
                <div className="my-4">
                  {/* <h1 className=" text-red-600">
                  To proceed further, Please fill the form below.
                  </h1> */}
                </div>
                {/* <div class="mt-10">
                  <Link to={'/employee-details-form'}><button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Click here to proceed</button></Link>
                </div> */}
                <div className="mt-10">
                  <Link to={'/manage-infra'}><button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Click here to manage Infrastructure</button></Link>
                </div> 

              </div>
            </>
          )}
        </>
      </div>
    </div>
  </div>

  )
}

export default EmployeeDashboard

