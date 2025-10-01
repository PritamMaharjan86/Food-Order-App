import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { MdShoppingCart, MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import Cart from '../components/Cart';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Loader from '../components/Loader';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const sliderRef = useRef(null);
    const [cart, setCart] = useState(() => {
        // Load from localStorage on first render
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

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("clicked", JSON.stringify(clicked));
    }, [clicked]);

    useEffect(() => {
        document.title = `Orderul - Home`;
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/api/menu')
            .then((res) => setMenu(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Scroll helpers
    const scroll = (dir) => {
        if (!sliderRef.current) return;
        const amount = 320;
        sliderRef.current.scrollBy({
            left: dir === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    const handleCart = (item) => {
        setLoading(item.id);
        setClicked((prev) => [...prev, item.id]);
        setTimeout(() => {
            setLoading(null);
        }, 500);
        toast.success('Added to cart');
        setCart((prevCart) => {

            const existingItem = prevCart.find((food) => food.id === item.id);
            if (existingItem) {
                return prevCart.map((food) =>
                    food.id === item.id
                        ? { ...food, quantity: food.quantity + 1 }
                        : food
                );
            } else {
                    
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const handleRemove = (itemId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart
                .map(ci => ci.id === itemId ? { ...ci, quantity: ci.quantity - 1 } : ci)
                .filter(ci => ci.quantity > 0);

            localStorage.setItem("cart", JSON.stringify(updatedCart));

            // if item fully removed, also update clicked
            const isRemoved = !updatedCart.find(ci => ci.id === itemId);
            if (isRemoved) {
                setClicked((prev) => prev.filter((clickedId) => clickedId !== itemId));
            }

            return updatedCart;
        });
    };

    const handleAdd = (foodId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === foodId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const removeFromCart = (foodId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== foodId));
        setClicked((prev) => prev.filter((clickedId) => clickedId !== foodId));
    };

    return (
        <div className="relative">
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

            <div className='flex flex-row justify-between p-1'>
                <h2 className="font-bold text-white p-3 text-2xl uppercase">What's popping today!</h2>
                <button onClick={toggleCart} className='text-white p-4'>
                    <MdShoppingCart className='h-6 w-6 ' />
                    <p className='bg-purple-400 text-white flex justify-center items-center rounded-full w-4 h-4 font-medium translate-x-3 -translate-y-8 text-sm '>
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
            />

            <div className='flex justify-center items-center'>
                <div className="relative w-5/6 ">
                    <button
                        onClick={() => scroll('left')}
                        className="absolute -left-10 top-1/2 h-8 w-8 -translate-y-1/2 z-20 bg-purple-400/70 text-white rounded-full shadow hover:bg-purple-600"
                    >
                        ◀
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="h-8 w-8 absolute -right-10 top-1/2 -translate-y-1/2 z-20 bg-purple-400/70 text-white rounded-full shadow hover:bg-purple-600"
                    >
                        ▶
                    </button>

                    <ul
                        ref={sliderRef}
                        className="flex overflow-x-auto gap-6 p-4 scroll-smooth no-scrollbar"
                    >
                        {menu.map((item) => (
                            <li
                                key={item.id}
                                className="min-w-[220px] flex-shrink-0 snap-start flex flex-col bg-white rounded-md p-3 border border-white"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-28 rounded-sm shadow-xl object-cover"
                                />
                                <p className="text-black font-bold mt-3">{item.name}</p>
                                <p className="text-black mt-5">${item.price}</p>

                                {clicked.includes(item.id) ? (
                                    // Counter UI
                                    <div className="flex justify-evenly items-center gap-5 h-12 border border-purple-500 flex-row rounded-md mt-2 bg-purple-500">
                                        <button
                                            className="text-white text-lg flex items-center ml-5 "
                                            onClick={() => handleAdd(item.id)}
                                        >
                                            <MdAdd />
                                        </button>
                                        <span className="bg-white w-12 h-10 justify-center items-center flex rounded-md text-sm">
                                            {cart.find((ci) => ci.id === item.id)?.quantity || 1}
                                        </span>
                                        <button
                                            className="text-white text-lg flex items-center mr-5"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            <FiMinus />
                                        </button>
                                    </div>
                                ) : (
                                    // Add to Cart Button
                                    <button
                                        onClick={() => handleCart(item)}
                                        className="h-12 hover:bg-opacity-80 hover:shadow-lg hover:bg-purple-800 mt-2 shadow-md shadow-purple-400 bg-purple-500 text-white p-2 rounded-md justify-center flex items-center"
                                    >
                                        {loading === item.id ? (
                                            <Loader className="w-2 h-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            "Add to cart"
                                        )}
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;
