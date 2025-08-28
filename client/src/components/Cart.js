import axios from "axios";
import { toast } from 'react-toastify';
import { FaLock } from "react-icons/fa";
import { IoIosRemoveCircleOutline, IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";


const Cart = ({ cart, isCartOpen, toggleCart, handleRemove, setCart, handleAdd, removeFromCart }) => {


    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);
        const orderData = { items: cart, status: 'Pending' }; // ✅ send selected items, not menu

        try {
            const res = await axios.post(
                "http://localhost:3001/api/order/postOrder",
                orderData
            );
            setCart([]);
            toast.success(res.data.message);

        } catch (err) {
            console.error("Error placing order:", err);
            toast.error(err);
        } finally {
            // setLoading(false);

        }
    };




    return (

        <div
            className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 
    ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="p-4 flex justify-between items-center border-b border-purple-300">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button className="text-red-600" onClick={toggleCart}>✕</button>
            </div>

            <div className="p-4 overflow-y-auto h-[80%] ">
                {cart.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b">
                            <p>{item.name} </p>

                            <div className="w-20 justify-between flex">
                                <button className="text-green-600 text-lg "
                                    onClick={() => handleAdd(item.id)}>
                                    <IoIosAddCircleOutline />

                                </button>
                                {item.quantity}
                                <button
                                    className="text-red-600 text-lg "
                                    onClick={() => handleRemove(item.id)}
                                >
                                    <IoIosRemoveCircleOutline />
                                </button>
                            </div>

                            <p>${(item.price * item.quantity).toFixed(2)}</p>

                            <button onClick={() => removeFromCart(item.id)} ><MdDeleteForever className="text-red-500 w-5 h-5" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 border-t  border-purple-300">
                <h3 className="font-bold">
                    Total: ${cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
                </h3>

                <button onClick={handleSubmit} className={`${cart.length > 0 ? 'bg-purple-500  shadow-purple-300 ' : 'bg-black bg-opacity-30 shadow-gray-300 '} mt-2 w-full h-fit relative overflow-hidden px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold transition-colors duration-300 group`}>
                    <span className="relative z-10 flex gap-4 justify-center items-center"> Checkout {cart.length > 0 ? ' ' : <FaLock />}</span>

                    {/* for sliding layer */}
                    <span className="absolute inset-0 bg-purple-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                </button>



            </div>
        </div>

    )
}

export default Cart
