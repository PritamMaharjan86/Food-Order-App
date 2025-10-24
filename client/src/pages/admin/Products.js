import { useEffect, useState } from 'react'
import axios from 'axios';
import { IoMdAdd } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';

const Products = () => {
    const [menu, setMenu] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', price: '', image: '' })

    //get menu item 
    useEffect(() => {
        axios.get('http://localhost:3001/api/product/getProduct')
            .then((res) => setMenu(res.data))
            .catch((err) => console.error('Error fetching menu data', err));
    }, []);


    //to add new item
    const handleAdd = async () => {

        if (!newItem.name || !newItem.price || !newItem.image) {
            alert('Please include all details of new item!');
            return;

        }

        try {
            const res = await axios.post('http://localhost:3001/api/product/postProduct', newItem);
            setMenu([...menu, res.data]);
            setNewItem({
                name: '',
                price: '',
                image: '',
            })
        } catch (err) {
            console.log(err);
        }
    }


    //to delete 
    const handleDelete = async (productId) => {

        try {
            await axios.delete(`http://localhost:3001/api/product/delete/${productId}`);
            setMenu(menu.filter(item => item.productId !== productId));
            toast.success("Item deleted");
        } catch (err) {
            console.error(err);
            alert("Error deleting item");
        }
    };


    return (
        <>
            <ToastContainer />
            <h1 className="text-black font-semibold text-2xl fixed bg-white w-11/12 h-15 p-4 rounded-lg shadow-md">
                Products
            </h1>

            <div className="bg-gray-200 rounded-lg shadow-md mt-20 p-4 ml-14 mr-14 ">
                <h2 className="text-xl font-semibold mb-3">Add New Product</h2>
                <div className="flex flex-col gap-2 md:flex-row">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) })}
                        className="border p-2 rounded-xl w-full"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        className="border p-2 rounded-xl w-full"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newItem.image}
                        onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                        className="border p-2 rounded-xl w-full"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-green-600 text-white px-4 rounded-xl hover:bg-green-700 flex flex-row items-center gap-1"
                    >
                        <IoMdAdd /> Add
                    </button>
                </div>
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
                                <td className="py-2 px-4 border-b border-gray-300 "> {item.productId} </td>
                                <td className="py-2 px-4 border-b border-gray-300 "> {item.name} </td>
                                <td className="py-2 px-4 border-b border-gray-300"> ${item.price} </td>
                                <td className="py-2 px-4 border-b border-gray-300 "> <img src={item.image} className='w-24 rounded-lg h-fit' /> </td>
                                <td className="py-2 px-4 border-b border-gray-300 ">
                                    <div className='flex flex-row gap-2 '>
                                        <button
                                            className="bg-red-500 w-1/4 text-gray-200 py-1 rounded-lg px-3"
                                            onClick={() => handleDelete(item.productId)}
                                        >
                                            Delete
                                        </button>
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
