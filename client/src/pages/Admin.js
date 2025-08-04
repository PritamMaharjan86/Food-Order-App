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
    return (
        <div>
            <div className='bg-white'>

                {order.map(order => (
                    <div key={order._id} className='border-b py-2 m-2'>
                        <p><strong>Name:</strong> {order.name}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Item:</strong> {order.item}</p>
                        <button onClick={()=>handleDelete(order._id)} className="p-1 rounded-md bg-red-600 text-white shadow-xl m-1 border ">Delete</button>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Admin
