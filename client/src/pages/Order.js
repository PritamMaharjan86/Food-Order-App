import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Order = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [items, setItems] = useState([]); // [{name, quantity}]
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3001/api/menu')
            .then((res) => setMenu(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = { name, phone, item: items };

        try {
            const res = await axios.post("http://localhost:3001/api/order/postOrder", orderData);
            alert(res.data.message);
            setLoading(false);
            setName("");
            setPhone("");
            setItems([]);
        } catch (err) {
            console.error("Error placing order:", err);
            alert("Failed to place order");
            setLoading(false);
        }
    };



    return (
        <div className="bg-black h-full">
            {loading && <Loader />}
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-48 m-3 gap-2">
                    <input
                        className="p-1 rounded-md m-1"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        className="p-1 rounded-md m-1"
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                 <div className='bg-white'>

                {menu.map(order => (
                    <div key={order._id} className='border-b py-2 m-2'>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Name:</strong> {order.name}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Item:</strong> <ul>
                            {menu.item.map((order, index) => (
                                <li key={index}>
                                    {order.name} — Quantity: {order.quantity}
                                </li>
                            ))}
                        </ul></p>
                        <p><strong>Order Time:</strong> {new Date(order.createdAt).toLocaleTimeString()}</p>
                        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                       
                    </div>
                ))}

            </div>

                <button
                    className="text-black border border-green-200 m-3 p-1 rounded-lg bg-green-600"
                    type="submit"
                >
                    Place Order
                </button>
            </form>




        </div>
    );
};

export default Order;
