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
    const sliderRef = useRef(null);

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(null);
    const [clicked, setClicked] = useState(() => {
        const added = localStorage.getItem('clicked');
        return added ? JSON.parse(added) : [];
    });

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    // Save cart & clicked state in localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("clicked", JSON.stringify(clicked));
    }, [clicked]);

    useEffect(() => {
        document.title = `OrderNow - Food at your doorstep`;
    }, []);

    // Fetch menu data from backend
    useEffect(() => {
        axios
            .get('http://localhost:3001/api/product/getProduct')
            .then((res) => setMenu(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Scroll left or right
    const scroll = (dir) => {
        if (!sliderRef.current) return;
        const amount = 320;
        sliderRef.current.scrollBy({
            left: dir === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    // Add to cart
    const handleCart = (item) => {
        setLoading(item.productId);
        setClicked((prev) => [...prev, item.productId]);

        setTimeout(() => setLoading(null), 500);
        toast.success('Added to cart');

        setCart((prevCart) => {
            const existingItem = prevCart.find((food) => food.productId === item.productId);
            if (existingItem) {
                return prevCart.map((food) =>
                    food.productId === item.productId
                        ? { ...food, quantity: food.quantity + 1 }
                        : food
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    // Decrease quantity or remove from cart
    const handleRemove = (productId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart
                .map((ci) =>
                    ci.productId === productId ? { ...ci, quantity: ci.quantity - 1 } : ci
                )
                .filter((ci) => ci.quantity > 0);

            localStorage.setItem("cart", JSON.stringify(updatedCart));

            // If removed completely, update clicked
            const isRemoved = !updatedCart.find((ci) => ci.productId === productId);
            if (isRemoved) {
                setClicked((prev) => prev.filter((id) => id !== productId));
            }

            return updatedCart;
        });
    };

    // Increase quantity
    const handleAdd = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Remove item completely from cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
        setClicked((prev) => prev.filter((id) => id !== productId));
    };

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

            {/* Cart */}
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

            {/* Menu Slider */}
            <div className="flex justify-center items-center">
                <div className="relative w-5/6 p-4 ">
                    <button
                        onClick={() => scroll('left')}
                        className="absolute -left-10 top-1/2 h-8 w-8 -translate-y-1/2 z-20 bg-black/40 text-white rounded-full shadow hover:bg-primaryGreen"
                    >
                        ◀
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="h-8 w-8 absolute -right-10 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white rounded-full shadow hover:bg-primaryGreen"
                    >
                        ▶
                    </button>

                    <ul
                        ref={sliderRef}
                        className="flex overflow-hidden gap-6 p-4 scroll-smooth no-scrollbar"
                    >
                        {menu.map((item) => (
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

                                {
                                    clicked.includes(item.productId) ? (
                                        // Counter UI
                                        <div className="flex justify-evenly items-center gap-5 h-12 flex-row rounded-md mt-2 bg-primaryGreen shadow-lg shadow-green-800">
                                            <button
                                                className="text-white text-lg flex items-center ml-5"
                                                onClick={() => handleAdd(item.productId)}
                                            >
                                                <MdAdd />
                                            </button>
                                            <span className="bg-sand w-12 h-10 flex justify-center items-center rounded-md text-sm">
                                                {cart.find((ci) => ci.productId === item.productId)?.quantity || 1}
                                            </span>
                                            <button
                                                className="text-white text-lg flex items-center mr-5"
                                                onClick={() => handleRemove(item.productId)}
                                            >
                                                <FiMinus />
                                            </button>
                                        </div>
                                    ) : (

                                        (item.avaibility === 'In Stock') ? (


                                            // Add to Cart Button
                                            < button
                                                onClick={() => handleCart(item)}
                                                className="h-12 hover:bg-green-700 mt-2 shadow-lg shadow-green-900 bg-primaryGreen text-white p-2 rounded-md justify-center flex items-center"
                                            >
                                                {loading === item.productId ? (
                                                    <Loader className="w-2 h-2 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    "Add to cart"
                                                )}
                                            </button>) : (
                                            <button
                                                disabled
                                                className="h-12 bg-gray-400 mt-2 shadow-lg shadow-gray-600 text-white p-2 rounded-md justify-center flex items-center cursor-not-allowed"
                                            >
                                                Out of Stock
                                            </button>
                                        )

                                    )
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default Menu;
