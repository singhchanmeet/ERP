import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const InfraData = () => {
    const accessToken = localStorage.getItem('accessToken');
    const [data, setData] = useState([]);
    const [checkboxes, setCheckboxes] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableRef = useRef(null);

    useEffect(() => {
        axios.get('https://admin.erp.mait.ac.in/infra/all-data/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            setData(response.data);
            const initialCheckboxes = new Array(response.data.length).fill(true);
            setCheckboxes(initialCheckboxes);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, [accessToken]);

    const downloadAsPdf = () => {
        const content = tableRef.current;
        const opt = {
            margin: 10,
            filename: 'table_data.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { },
            jsPDF: { unit: 'mm', format: 'a2', orientation: 'landscape' },
        };
        html2pdf().from(content).set(opt).save();
    };

    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setCheckboxes(updatedCheckboxes);
    };

    if (loading) {
        return <p>Loading... Please wait</p>;
    }

    return (
        <div className=''>
            {data.length > 0 &&
                <div className='flex flex-wrap gap-2 py-5 px-4'>
                    {Object.keys(data[0]).map((key, index) => (
                        key !== 'id' &&
                        <div key={index} className='flex items-center mx-2 p-2 rounded bg-zinc-100' style={{ marginBottom: '10px' }} >
                            <label htmlFor={`${key}_checkbox`} style={{ marginRight: '5px' }} className='text-xl'>{key.toUpperCase()}</label>
                            <input
                                className='hover:cursor-pointer'
                                type="checkbox"
                                id={`${key}_checkbox`}
                                checked={checkboxes[index]}
                                onChange={() => handleCheckboxChange(index)}
                            />
                        </div>
                    ))}
                </div>
            }

            <button onClick={downloadAsPdf} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Print as PDF
            </button>

            <div ref={tableRef}>
                <table  style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key, index) => (
                                key !== 'id' && checkboxes[index] &&
                                <th key={index} style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold', textAlign: 'center' }}>{key.toUpperCase()}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((record, recordIndex) => (
                            <tr key={recordIndex}>
                                {Object.values(record).map((value, valueIndex) => (
                                    valueIndex !== 0 && checkboxes[valueIndex] &&
                                    <td key={valueIndex} style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InfraData;
