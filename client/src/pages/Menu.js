import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
// import Order from './Order'; // keep if you need it

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/menu')
            .then((res) => setMenu(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Scroll helpers
    const scroll = (dir) => {
        if (!sliderRef.current) return;
        const amount = 320; // px to move per click (tweak to taste)
        sliderRef.current.scrollBy({
            left: dir === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    return (
        <div className="relative">
            <h2 className="font-bold text-white p-3 text-2xl uppercase">What's popping today!</h2>
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
                                <button className="mt-2 shadow-md shadow-purple-400 bg-purple-500 text-white p-2 rounded-md justify-center flex items-center">
                                    Add to cart
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;
