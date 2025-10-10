import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { TbLogout2 } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";


const Admin = () => {
    const [orders, setOrders] = useState([]);
    const [activePage, setActivePage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/api/order/getOrder')
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = async (orderId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/order/deleteOrder/${orderId}`);
            toast.success(response.data.message);
            setOrders(prev => prev.filter(order => order._id !== orderId));
        } catch (err) {
            console.error("Failed to delete order", err);
            alert("Failed to delete order");
        }
    };

    const handleDelivered = async (orderId) => {
        try {
            await axios.patch(`http://localhost:3001/api/order/updateStatus/${orderId}`, {
                status: 'Delivered'
            });
            setOrders(prev =>
                prev.map(order => order._id === orderId ? { ...order, status: 'Delivered' } : order)
            );
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleLogOff = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };


    return (
        <div className="bg-black h-screen flex flex-row">
            <ToastContainer />

            {/* LEFT SIDEBAR */}
            <div className="w-1/5 flex flex-col justify-between ml-4">
                <div>
                    <div className="flex flex-row m-4 gap-2 items-center">
                        <img className="w-6 h-6 rounded-md" src="https://res.cloudinary.com/dedpvue13/image/upload/v1759402409/ChatGPT_Image_Oct_2_2025_08_53_11_PM_yubwui.png" />
                        <span className="text-white text-xl">OrderNow</span>
                    </div>


                    <button
                        onClick={() => setActivePage('dashboard')}
                        className={`p-2 rounded-lg m-2 w-1/2 text-gray-300 font-thin flex flex-row items-center gap-3  hover:bg-gray-100 hover:text-black ${activePage === 'dashboard' ? ' bg-white text-gray-800' : ''}`}
                    >
                        <RiDashboardLine />
                        Dashboard
                    </button>

                    <button
                        onClick={() => setActivePage('orders')}
                        className={`p-2 w-1/2 rounded-lg m-2 text-gray-300 font-thin flex flex-row items-center gap-3  hover:bg-gray-100 hover:text-black ${activePage === 'orders' ? 'text-gray-800 bg-white ' : ''}`}
                    >
                        <FiShoppingBag /> Orders
                    </button>
                </div>

                <div className="mb-6 ">
                    <button
                        onClick={handleLogOff}
                        className="p-2 rounded-lg m-2 text-gray-300 font-thin flex flex-row items-center gap-3 hover:bg-gray-100 hover:text-black"
                    >
                        <TbLogout2 /> Logout
                    </button>
                </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="bg-white w-11/12 rounded-lg h-screen overflow-y-auto">
                {activePage === 'orders' && (
                    <>
                        <h1 className="text-black font-semibold text-2xl fixed bg-white w-11/12 h-15 p-4 rounded-lg shadow-md">
                            Orders
                        </h1>

                        <div className="flex flex-row justify-between m-8 p-4 mt-20">
                            {orders.length > 0 ? (
                                <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden">
                                    <thead className="bg-gray-200 text-left">
                                        <tr>
                                            <th className="py-3 px-4 border-b">Order ID</th>
                                            <th className="py-3 px-4 border-b">Customer</th>
                                            <th className="py-3 px-4 border-b">Phone</th>
                                            <th className="py-3 px-4 border-b">Address</th>
                                            <th className="py-3 px-4 border-b">Items</th>
                                            <th className="py-3 px-4 border-b">Total</th>
                                            <th className="py-3 px-4 border-b">Status</th>
                                            <th className="py-3 px-4 border-b">Date</th>
                                            <th className="py-3 px-4 border-b text-center">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {orders.map((order) => {
                                            const total = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);
                                            return (
                                                <tr key={order._id} className="hover:bg-gray-50 transition-all">
                                                    <td className="py-2 px-4 border-b text-sm">{order.orderId}</td>
                                                    <td className="py-2 px-4 border-b">{order.customer?.name || 'N/A'}</td>
                                                    <td className="py-2 px-4 border-b">{order.customer?.phone || 'N/A'}</td>
                                                    <td className="py-2 px-4 border-b">{order.customer?.address || 'N/A'}</td>
                                                    <td className="py-2 px-4 border-b">
                                                        <ul className="list-disc ml-4">
                                                            {order.items.map((food, i) => (
                                                                <li key={i}>
                                                                    {food.name} -- {food.quantity}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                    <td className="py-2 px-4 border-b font-semibold">${total}</td>
                                                    <td className={`py-2 px-4 border-b text-white`}>
                                                        <span className={`px-3 py-1 rounded-lg ${order.status === 'Pending' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 px-4 border-b text-sm">
                                                        {new Date(order.createdAt).toLocaleDateString()}<br />
                                                        <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</span>
                                                    </td>
                                                    <td className="py-2 px-4 border-b text-center">
                                                        <div className="flex flex-col gap-2 items-center">
                                                            <button
                                                                onClick={() => handleDelete(order._id)}
                                                                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                                                            >
                                                                Delete
                                                            </button>
                                                            {order.status === 'Pending' && (
                                                                <button
                                                                    onClick={() => handleDelivered(order._id)}
                                                                    className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-md"
                                                                >
                                                                    Deliver
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-20 text-gray-500 font-semibold text-2xl">
                                    No Orders found
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Admin;
