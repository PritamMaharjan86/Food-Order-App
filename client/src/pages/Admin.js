import { useEffect, useState } from "react";
import axios from 'axios';

const Admin = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/order/getOrder')
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));

    }, []);

    const handleDelete = async (orderId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this order?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:3001/api/order/deleteOrder/${orderId}`);
            alert(response.data.message);
            setOrders(prev => prev.filter(o => o._id !== orderId));
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
                prev.map(o => o._id === orderId ? { ...o, status: 'Delivered' } : o)
            );
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };


    return (
        <div>
            {orders.length > 0 ? (
                <div className='bg-white'>
                    {orders.map(order => (
                        <div key={order._id} className='border-b py-2 m-2'>
                            <p className={order.status === 'Pending' ? 'text-red-500' : 'text-green-500'}><strong>Status:</strong> {order.status}</p>
                            <p><strong>Name:</strong> {order.name}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>

                            <p><strong>Items:</strong></p>
                            <ul>
                                {order.items.map((food, index) => (

                                    <li key={food.id || index}>
                                        {food.name} - {food.quantity}
                                    </li>

                                ))}
                            </ul>

                            <p><strong>Order Time:</strong> {new Date(order.createdAt).toLocaleTimeString()}</p>
                            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className="text-blue-500"><strong>Total Cost: ${order.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}  </strong></p>
                            <button
                                onClick={() => handleDelete(order._id)}
                                className="p-1 rounded-md bg-red-600 text-white shadow-xl m-1 border "
                            >
                                Delete
                            </button>

                            {order.status === 'Pending' && (
                                <button
                                    className="bg-green-600 border rounded-md p-1 text-white"
                                    onClick={() => handleDelivered(order._id)}
                                >
                                    Mark as Delivered
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p className="text-white font-bold text-5xl items-center justify-center flex">
                        No Orders left.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Admin;
