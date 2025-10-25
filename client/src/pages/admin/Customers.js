import { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Customers = () => {
    const [menu, setMenu] = useState([]);

    //get menu item 
    useEffect(() => {
        axios.get('http://localhost:3001/api/order/getOrder')
            .then((res) => setMenu(res.data))
            .catch((err) => console.error('Error fetching menu data', err));
    }, []);


    // //to delete 
    // const handleDelete = async (productId) => {

    //     try {
    //         await axios.delete(`http://localhost:3001/api/product/delete/${productId}`);
    //         setMenu(menu.filter(item => item.productId !== productId));
    //         toast.success("Item deleted");
    //     } catch (err) {
    //         console.error(err);
    //         alert("Error deleting item");
    //     }
    // };


    return (
        <>
            <ToastContainer />
            <h1 className="text-black font-semibold text-2xl fixed bg-white w-11/12 h-15 p-4 rounded-lg shadow-md">
                Customers
            </h1>


            <div className='flex flex-row justify-between p-4 mt-16'>

                <table className='text-black min-w-full border border-gray-300 rounded-xl overflow-hidden'>
                    <thead className='bg-gray-200 text-left'>
                        <tr>
                            <th className='py-3 px-4 border-b border-gray-300'>Order Id</th>
                            <th className='py-3 px-4 border-b border-gray-300'>Name</th>
                            <th className='py-3 px-4 border-b border-gray-300'>Phone</th>
                            <th className='py-3 px-4 border-b border-gray-300'>Address</th>
                            <th className='py-3 px-4 border-b border-gray-300'>Action</th>
                        </tr>
                    </thead>

                    <tbody className='text-black'>
                        {menu.map((item) => (

                            <tr className="hover:bg-gray-200 transition-all ">
                                <td className="py-2 px-4 border-b border-gray-300 "> {item.orderId} </td>
                                <td className="py-2 px-4 border-b border-gray-300 "> {item.customer.name} </td>
                                <td className="py-2 px-4 border-b border-gray-300"> {item.customer.phone} </td>
                                <td className="py-2 px-4 border-b border-gray-300"> {item.customer.address} </td>
                                <td className="py-2 px-4 border-b border-gray-300 ">
                                    <div className='flex flex-row gap-2 w-fit '>
                                        <button
                                            className="bg-red-500 text-gray-200 py-1 rounded-lg px-3"
                                            // onClick={() => handleDelete(item.productId)}
                                        >
                                            Delete
                                        </button>
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

export default Customers
