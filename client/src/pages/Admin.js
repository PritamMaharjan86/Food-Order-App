import { useEffect, useState } from "react";
import axios from 'axios';

const Admin = () => {

    const [order, setOrder] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/order/getOrder')
            .then(res => setOrder(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <div className='bg-white'>

                {order.map(order => (
                    <div key={order._id} className='border-b py-2'>
                        <p><strong>Name:</strong> {order.name}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Item:</strong> {order.item}</p>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Admin
