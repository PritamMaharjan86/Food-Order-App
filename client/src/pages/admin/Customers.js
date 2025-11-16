import { useEffect, useState } from 'react'
import axios from 'axios';

const Customers = () => {
    const [menu, setMenu] = useState([]);
    const [uniqueCustomers, setUniqueCustomers] = useState([]);

    // Get all orders
    useEffect(() => {
        axios.get('http://localhost:3001/api/order/getOrder')
            .then((res) => {
                setMenu(res.data);

                // Create unique customer list based on phone or name
                const unique = [];
                const seen = new Set();

                for (const order of res.data) {
                    // Use phone (or email if you have one) to identify uniqueness
                    const key = order.customer.phone || order.customer.name;

                    if (!seen.has(key)) {
                        seen.add(key);
                        unique.push(order);
                    }
                }
                setUniqueCustomers(unique);
            })
            .catch((err) => console.error('Error fetching order data', err));
    }, []);





    return (
        <>
            <h1 className="text-black font-semibold text-2xl fixed bg-white w-11/12 h-15 p-4 rounded-lg shadow-md">
                Customers
            </h1>

            <div className="flex flex-row justify-between p-4 mt-16">
                <table className="text-black min-w-full border border-gray-300 rounded-xl overflow-hidden">
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th className="py-3 px-4 border-b border-gray-300">Customer ID</th>
                            <th className="py-3 px-4 border-b border-gray-300">Name</th>
                            <th className="py-3 px-4 border-b border-gray-300">Phone</th>
                            <th className="py-3 px-4 border-b border-gray-300">Address</th>
                            <th className="py-3 px-4 border-b border-gray-300">Last Ordered</th>
                            <th className="py-3 px-4 border-b border-gray-300">Total Cost</th>
                            <th className="py-3 px-4 border-b border-gray-300">Total Orders</th>
                        </tr>
                    </thead>

                    <tbody className="text-black">
                        {uniqueCustomers.map((item, index) => {
                            // Count total orders by the same customer
                            const totalOrders = menu.filter(
                                (order) => order.customer.phone === item.customer.phone
                            ).length;

                            const totalCost = menu
                                .filter(order => order.customer.phone === item.customer.phone) //to filter only the orders with same phone and name of a customer
                                .reduce((sum, order) => sum + order.items.reduce((s, i) => s + i.price * i.quantity, 0), 0) // go thru each order and add the total cost of all items
                                .toFixed(2); //to make it in decimal format (40.50)


                            return (
                                <tr key={index} className="hover:bg-gray-200 transition-all">
                                    <td className="py-2 px-4 border-b border-gray-300">{item.customer.customerId}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.customer.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.customer.phone}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.customer.address}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-left">{item.updatedAt.slice(0, 10)}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-left">${totalCost}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-left">{totalOrders}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Customers;
