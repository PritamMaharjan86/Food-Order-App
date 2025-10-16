import { useEffect, useState } from 'react'
import axios from 'axios';
import { IoMdAdd } from "react-icons/io";


const Products = () => {
    const [menu, setMenu] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3001/api/menu')
            .then((res) => setMenu(res.data))
            .catch((err) => console.error('Error fetching menu data', err));
    }, []);


    return (
        <>
            <h1 className="text-black font-semibold text-2xl fixed bg-white w-11/12 h-15 p-4 rounded-lg shadow-md">
                Products
            </h1>
            <div className='mt-20 flex justify-end mr-5'>
                <button className='shadow-xl flex-row flex items-center gap-1 shadow-gray-300 bg-green-500 w-fit text-gray-100 py-1 rounded-lg px-3'> <IoMdAdd />
                    Add</button>
            </div>
            <div className='flex flex-row justify-between p-4'>

                <table className='text-black min-w-full border border-gray-300 rounded-xl overflow-hidden'>
                    <thead className='bg-gray-200 text-left'>
                        <tr>
                            <th className='py-3 px-4 border-b border-gray-300'>Id</th>
                            <th className='py-3 px-4 border-b border-gray-300'>Name</th>
                            <th className='py-3 px-4 border-b border-gray-300'>Price</th>
                            <th className='py-3 px-4 border-b border-gray-300'>Image</th>
                            <th className='py-3 px-4 border-b border-gray-300'>Action</th>
                        </tr>
                    </thead>

                    <tbody className='text-black'>
                        {menu.map((item) => (

                            <tr className="hover:bg-gray-200 transition-all ">
                                <td className="py-2 px-4 border-b border-gray-300 "> {item.id} </td>
                                <td className="py-2 px-4 border-b border-gray-300 "> {item.name} </td>
                                <td className="py-2 px-4 border-b border-gray-300"> {item.price} </td>
                                <td className="py-2 px-4 border-b border-gray-300 "> <img src={item.image} className='w-24 rounded-lg h-fit' /> </td>
                                <td className="py-2 px-4 border-b border-gray-300 ">
                                    <div className='flex flex-row gap-2 '>
                                        <button className=' bg-red-500 w-1/4 text-gray-200 py-1 rounded-lg px-3'>Delete</button>
                                        <button className=' bg-blue-500 w-1/4 text-gray-200 py-1 rounded-lg px-3'>Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>


        </>
    )
}

export default Products
