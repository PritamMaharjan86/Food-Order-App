import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { MdShoppingCart, MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import Cart from '../../components/Cart';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Banner from '../../components/Banner';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(null);
    const [clicked, setClicked] = useState(() => JSON.parse(localStorage.getItem('clicked')) || []);
    const sliderRefs = useRef({});

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    // Local storage sync
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
    useEffect(() => localStorage.setItem("clicked", JSON.stringify(clicked)), [clicked]);

    useEffect(() => { document.title = `OrderNow - Food at your doorstep`; }, []);

    // Fetch menu data
    useEffect(() => {
        axios
            .get('http://localhost:3001/api/product/getProduct')
            .then((res) => setMenu(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Scroll left or right for a specific category
    const scroll = (category, dir) => {
        const slider = sliderRefs.current[category];
        if (!slider) return;
        const amount = 320;
        slider.scrollBy({
            left: dir === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    // Add to cart
    const handleCart = (item) => {
        setLoading(item.productId);
        setClicked(prev => [...prev, item.productId]);
        setTimeout(() => setLoading(null), 500);
        toast.success('Added to cart');
        setCart(prevCart => {
            const existingItem = prevCart.find(food => food.productId === item.productId);
            return existingItem
                ? prevCart.map(food =>
                    food.productId === item.productId
                        ? { ...food, quantity: food.quantity + 1 }
                        : food
                )
                : [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const handleRemove = (productId) => {
        setCart(prevCart => {
            const updatedCart = prevCart
                .map(ci =>
                    ci.productId === productId
                        ? { ...ci, quantity: ci.quantity - 1 }
                        : ci
                )
                .filter(ci => ci.quantity > 0);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            if (!updatedCart.find(ci => ci.productId === productId)) {
                setClicked(prev => prev.filter(id => id !== productId));
            }
            return updatedCart;
        });
    };

    const handleAdd = (productId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.productId !== productId));
        setClicked(prev => prev.filter(id => id !== productId));
    };

    // Group by category
    const categories = menu.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <div className="relative h-full bg-sand">
            <ToastContainer
                position="top-center"
                autoClose={200}
                limit={2}
                hideProgressBar
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />

            {/* Header */}
            <div className="flex flex-row justify-between p-1">
                <h2 className="font-bold text-primaryGreen p-2 m-5 rounded-xl shadow-xl border-primaryGreen border shadow-gray-400 text-2xl bg-sand">
                    OrderNow
                </h2>
                <button onClick={toggleCart} className="p-4 relative">
                    <MdShoppingCart className="h-6 w-6 text-black" />
                    <p className="bg-primaryGreen text-white flex justify-center items-center rounded-full w-4 h-4 font-medium absolute top-5 right-3 text-sm">
                        {cart.length}
                    </p>
                </button>
            </div>

            <Cart
                isCartOpen={isCartOpen}
                toggleCart={toggleCart}
                cart={cart}
                handleRemove={handleRemove}
                setCart={setCart}
                handleAdd={handleAdd}
                removeFromCart={removeFromCart}
                setClicked={setClicked}
            />

            <Banner />

            <h2 className="font-bold text-black p-3 text-2xl flex justify-center underline">
                What’s Trending Today!
            </h2>

            {/* MULTIPLE SLIDERS BY CATEGORY */}
            <div className="space-y-10 mt-5">
                {Object.keys(categories).map((category) => (
                    <div key={category} className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold mb-3 underline">{category}</h3>

                        <div className="relative w-5/6 p-4">
                            <button
                                onClick={() => scroll(category, 'left')}
                                className="absolute -left-10 top-1/2 h-8 w-8 -translate-y-1/2 z-20 bg-black/40 text-white rounded-full shadow hover:bg-primaryGreen"
                            >
                                ◀
                            </button>

                            <button
                                onClick={() => scroll(category, 'right')}
                                className="h-8 w-8 absolute -right-10 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white rounded-full shadow hover:bg-primaryGreen"
                            >
                                ▶
                            </button>

                            <ul
                                ref={(el) => (sliderRefs.current[category] = el)}
                                className="flex overflow-hidden gap-6 p-4 scroll-smooth no-scrollbar"
                            >
                                {categories[category].map((item) => (
                                    <li
                                        key={item.productId}
                                        className="shadow-sm shadow-black min-w-[220px] flex-shrink-0 snap-start flex flex-col bg-sand border border-green-800 rounded-md p-3"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.category}
                                            className="w-full h-28 rounded-md shadow-xl object-cover"
                                        />

                                        <p className="text-black font-bold mt-3">{item.name}</p>
                                        <p className="text-black mt-5">${item.price}</p>

                                        {clicked.includes(item.productId) ? (
                                            <div className="flex justify-evenly items-center gap-5 h-12 flex-row rounded-md mt-2 bg-primaryGreen shadow-lg shadow-green-800">
                                                <button
                                                    className="text-white text-lg flex items-center ml-5"
                                                    onClick={() => handleAdd(item.productId)}
                                                >
                                                    <MdAdd />
                                                </button>
                                                <span className="bg-sand w-12 h-10 flex justify-center items-center rounded-md text-sm">
                                                    {cart.find(ci => ci.productId === item.productId)?.quantity || 1}
                                                </span>
                                                <button
                                                    className="text-white text-lg flex items-center mr-5"
                                                    onClick={() => handleRemove(item.productId)}
                                                >
                                                    <FiMinus />
                                                </button>
                                            </div>
                                        ) : item.avaibility === 'In Stock' ? (
                                            <button
                                                onClick={() => handleCart(item)}
                                                className="h-12 hover:bg-green-700 mt-2 shadow-lg shadow-green-900 bg-primaryGreen text-white p-2 rounded-md justify-center flex items-center"
                                            >
                                                {loading === item.productId ? (
                                                    <Loader className="w-2 h-2 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    "Add to cart"
                                                )}
                                            </button>
                                        ) : (
                                            <button
                                                disabled
                                                className="h-12 bg-gray-400 mt-2 shadow-lg shadow-gray-600 text-white p-2 rounded-md justify-center flex items-center cursor-not-allowed"
                                            >
                                                Out of Stock
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
