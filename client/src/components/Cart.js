import axios from "axios";
import { useState } from "react";

const Cart = ({ cart, isCartOpen, toggleCart, handleRemove, setCart }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);

        const orderData = { items: cart, status: 'Pending' }; // ✅ send selected items, not menu

        try {
            const res = await axios.post(
                "http://localhost:3001/api/order/postOrder",
                orderData
            );
            alert(res.data.message);
            setCart([]);

        } catch (err) {
            console.error("Error placing order:", err);
            alert("Failed to place order");
        } finally {
            // setLoading(false);

        }
    };


    return (

        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 
    ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button className="text-red-600" onClick={toggleCart}>✕</button>
            </div>

            <div className="p-4 overflow-y-auto h-[80%]">
                {cart.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b">
                            <p>{item.name} x {item.quantity}</p>
                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                            <button
                                className="text-red-600 ml-2"
                                onClick={() => handleRemove(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 border-t">
                <h3 className="font-bold">
                    Total: ${cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
                </h3>
                <button
                    className="w-full bg-green-600 text-white mt-2 py-2 rounded"
                    onClick={handleSubmit}


                >
                    Place Order
                </button>
            </div>
        </div>

    )
}

export default Cart
