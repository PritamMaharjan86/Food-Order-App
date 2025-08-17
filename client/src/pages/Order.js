import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Order = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/menu")
            .then((res) => setMenu(res.data))
            .catch((err) => console.error(err));
    }, []);

    const getId = (food) => food._id || food.id; // Support both formats

    const handleCheckboxChange = (food) => {
        const id = getId(food);
        if (items.some((item) => item.id === id)) {
            // Remove if unchecked
            setItems(items.filter((item) => item.id !== id));
        } else {
            // Add if checked
            setItems([
                ...items,
                { id, name: food.name, price: food.price, quantity: 1 },
            ]);
        }
    };

    const handleQuantityChange = (foodId, quantity) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === foodId
                    ? { ...item, quantity: parseInt(quantity) || 1 }
                    : item
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = { name, phone, items: menu };

        try {
            const res = await axios.post(
                "http://localhost:3001/api/order/postOrder",
                orderData
            );
            alert(res.data.message);
            setName("");
            setPhone("");
            setItems([]);
        } catch (err) {
            console.error("Error placing order:", err);
            alert("Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <Loader />}
            <form onSubmit={handleSubmit}>
                {/* Name & Phone */}
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

                {/* Menu Items */}
                <div className="text-white flex flex-col gap-1 w-1/4 justify-center m-3">
                    {menu.map((food) => {
                        const selected = items.some((item) => item.name === food);
                        const quantity =
                            items.find((item) => item.name === food)?.quantity || 1;

                        return (
                            <label key={food} className="items-center flex gap-2">
                                <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={() => handleCheckboxChange(food)}
                                />
                                {food.name} - ${food.price}
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    disabled={!selected}
                                    onChange={(e) => handleQuantityChange(food, e.target.value)}
                                    className="w-16 p-1 rounded-md text-black"
                                />
                            </label>
                        );
                    })}
                </div>

                {/* Submit */}
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
