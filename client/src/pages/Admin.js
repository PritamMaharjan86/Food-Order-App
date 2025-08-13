import { useEffect, useState } from "react";
import axios from 'axios';

const Admin = () => {

    const [order, setOrder] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/order/getOrder')
            .then(res => setOrder(res.data))
            .catch(err => console.error(err));
    }, []);


    const handleDelete = async (orderId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this order?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:3001/api/order/deleteOrder/${orderId}`);
            alert(response.data.message);

            // Refresh the order list after deletion
            setOrder(prev => prev.filter(order => order._id !== orderId));
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
            console.log('Order updated');
            window.location.reload();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };


    return (
        <div>

            {order.length > 0 ? (
            <div className='bg-white'>

                {order.map(order => (
                    <div key={order._id} className='border-b py-2 m-2'>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Name:</strong> {order.name}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Item:</strong> <ul>
                            {order.item.map((order, index) => (
                                <li key={index}>
                                    {order.name} — Quantity: {order.quantity}
                                </li>
                            ))}
                        </ul></p>
                        <p><strong>Order Time:</strong> {new Date(order.createdAt).toLocaleTimeString()}</p>
                        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <button onClick={() => handleDelete(order._id)} className="p-1 rounded-md bg-red-600 text-white shadow-xl m-1 border ">Delete</button>
                        {order.status === 'Pending' && (
                            <button className="bg-green-600 border rounded-md p-1 text-white" onClick={() => handleDelivered(order._id)} >Mark as Delivered</button>
                        )}
                    </div>
                ))}

            </div>) : (<div>
                <p className="text-white font-bold text-5xl items-center justify-center flex">No Orders left.</p></div>)}


        </div>
    )
}

export default Admin
