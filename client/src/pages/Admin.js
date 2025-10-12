import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { TbLogout2 } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import Orders from "./Orders";
import Dashboard from "./Dashboard";


const Admin = () => {
    const [orders, setOrders] = useState([]);
    const [activePage, setActivePage] = useState('dashboard');
    const navigate = useNavigate();
    const name = localStorage.getItem('loggedIn');

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
        <div className="bg-black h-screen flex flex-row m-0">
            <ToastContainer />

            {/* LEFT SIDEBAR */}
            <div className="w-64 flex flex-col justify-between ml-4">
                <div>
                    <div className="flex flex-row m-4 gap-2 items-center">
                        <img className="w-6 h-6 rounded-md border border-gray-200" src="https://res.cloudinary.com/dedpvue13/image/upload/v1759402409/ChatGPT_Image_Oct_2_2025_08_53_11_PM_yubwui.png" alt="profile" />
                        <span className="text-white text-xl">{name}</span>
                    </div>


                    <button
                        onClick={() => setActivePage('dashboard')}
                        className={`p-2 rounded-lg m-2 w-3/4 text-gray-300 font-thin flex flex-row items-center gap-3  hover:bg-gray-100 hover:text-black ${activePage === 'dashboard' ? ' bg-white text-gray-800' : ''}`}
                    >
                        <RiDashboardLine />
                        Dashboard
                    </button>

                    <button
                        onClick={() => setActivePage('orders')}
                        className={`p-2 w-3/4 rounded-lg m-2 text-gray-300 font-thin flex flex-row items-center gap-3  hover:bg-gray-100 hover:text-black ${activePage === 'orders' ? 'text-gray-800 bg-white ' : ''}`}
                    >
                        <FiShoppingBag /> Orders
                    </button>
                </div>

                <div className="mb-6 ">
                    <button
                        onClick={handleLogOff}
                        className="p-2 w-3/4 rounded-lg m-2 text-gray-300 font-thin flex flex-row items-center gap-3 hover:bg-gray-100 hover:text-black"
                    >
                        <TbLogout2 /> Logout
                    </button>
                </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="bg-white w-11/12 rounded-lg h-full overflow-y-auto  ">
                {activePage === 'orders' && (
                    <>
                        <Orders
                            orders={orders}
                            handleDelete={handleDelete}
                            handleDelivered={handleDelivered}
                        />
                    </>
                )}

                {activePage === 'dashboard' && (
                    <>

                        <Dashboard
                            orders={orders}
                        />
                    </>
                )



                }
            </div>
        </div>
    );
};

export default Admin;
