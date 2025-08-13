import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Order = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [items, setItems] = useState([]); // [{name, quantity}]
    const [loading, setLoading] = useState(false);

    const foodOptions = ["Burger", "Pizza", "Fries", "Momo", "Noodles", "Fried Rice"];

    // Handle checkbox select/unselect
    const handleCheckboxChange = (food) => {
        if (items.some((item) => item.name === food)) {
            // Remove item if unchecked
            setItems(items.filter((item) => item.name !== food));
        } else {
            // Add item with default quantity 1
            setItems([...items, { name: food, quantity: 1 }]);
        }
    };

    // Handle quantity change
    const handleQuantityChange = (food, quantity) => {
        setItems(
            items.map((item) =>
                item.name === food ? { ...item, quantity: parseInt(quantity) || 1 } : item
            )
        );
    };

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
        <div>
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

                <div className="text-white flex flex-col gap-1 w-1/4 justify-center m-3">
                    {foodOptions.map((food) => {
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
                                {food}
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
