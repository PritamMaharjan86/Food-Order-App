
const Orders = ({ orders, handleDelete, handleDelivered }) => {
    return (
        <>
            <h1 className="text-black font-semibold text-2xl fixed bg-white w-11/12 h-15 p-4 rounded-lg shadow-md">
                Orders
            </h1>

            <div className="flex flex-row justify-between m-2 mt-20">
                {orders.length > 0 ? (
                    <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden">
                        <thead className="bg-gray-200 text-left">
                            <tr>
                                <th className="py-3 px-4 border-b border-gray-300">Order Id</th>
                                <th className="py-3 px-4 border-b border-gray-300">Customer</th>
                                <th className="py-3 px-4 border-b border-gray-300">Phone</th>
                                <th className="py-3 px-4 border-b border-gray-300">Address</th>
                                <th className="py-3 px-4 border-b border-gray-300">Items</th>
                                <th className="py-3 px-4 border-b border-gray-300">Total</th>
                                <th className="py-3 px-4 border-b border-gray-300">Status</th>
                                <th className="py-3 px-4 border-b border-gray-300">Date</th>
                                <th className="py-3 px-4 border-b text-center border-gray-300">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => {
                                const total = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2);
                                return (
                                    <tr key={order._id} className="hover:bg-gray-200 transition-all">
                                        <td className="py-2 px-4 border-b border-gray-300 text-sm">{order.orderId}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{order.customer?.name || 'N/A'}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{order.customer?.phone || 'N/A'}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{order.customer?.address || 'N/A'}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">
                                            <ul className="list-disc ml-4">
                                                {order.items.map((food, i) => (
                                                    <li key={i}>
                                                        {food.name} -- {food.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="py-2 px-4 border-b font-semibold border-gray-300">${total}</td>
                                        <td className={`py-2 px-4 border-b text-white border-gray-300`}>
                                            <span className={`px-3 py-1 rounded-lg ${order.status === 'Pending' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b text-sm border-gray-300">
                                            {new Date(order.createdAt).toLocaleDateString()}<br />
                                            <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</span>
                                        </td>
                                        <td className="py-2 px-4 border-b text-center border-gray-300">
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
    )
}

export default Orders
