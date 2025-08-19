import axios from 'axios';
import { useState, useEffect } from 'react';
import Order from './Order';

const Menu = () => {

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/menu')
            .then((res) => setMenu(res.data))
            .catch((err) => console.error(err));
    }, []);


    return (
        <div>
            <h2 className='font-bold text-white text-xl'>Menu</h2>
            <ul className='text-white flex flex-row gap-10 m-3 '>
                {menu.map(item =>
                (
                    <li key={item.id}>
                        <img className='w-32 h-24 rounded-lg' src={item.image} alt={item.name} ></img>
                        <p className='justify-center items-center flex '>{item.name} </p>
                        <p className='justify-center items-center flex '>${item.price}</p>
                    </li>
                )
                )}
            </ul>

            <Order />
        </div>
    )
}

export default Menu
