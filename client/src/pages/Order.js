import { useState } from "react";
import axios from 'axios';
import Loader from "../components/Loader";
import { IoIosLock, IoIosUnlock } from "react-icons/io";


const Order = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = { name, phone, item, };

        try {
            const response = await axios.post('http://localhost:3001/api/order/postOrder', orderData);
            setLoading(false);
            alert(response.data.message);

        }
        catch (error) {
            console.error('Error sending order:', error);
            setLoading(false);
            alert('Order failed to place!')
        }


    }

    const handleItemChange = (e) => {

        const value = e.target.value;
        const checked = e.target.checked;

        if (checked) {
            setItem(prev => [...prev, value]);
            setInfo(true);
        } else {
            setItem(prev => prev.filter(item => item !== value));
        }
    }


    return (
        <div>
            {loading ? <Loader /> : <p></p>} //ternary operator
            <form onSubmit={handleSubmit}>

                <div className='flex flex-col w-48 m-3 gap-2 '>
                    <input className='p-1 rounded-md m-1' type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} />
                    <input className='p-1 rounded-md m-1' type='text' placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className='text-white flex flex-col gap-1 w-1/4 justify-center m-3'>
                    {['Burger', 'Pizza', 'Fries', 'Momo', 'Noodles', 'Fried Rice'].map((food) => (
                        <label key={food} className='items-center flex gap-2'>
                            <input
                                type='checkbox'
                                name='item'
                                value={food}
                                onChange={handleItemChange}

                            /> {food}
                        </label>
                    ))}
                </div>



                <button className={`text-white border m-3 p-2 rounded-lg bg-green-600 w-fit flex flex-row justify-center items-center gap-2 ${info ? '' : 'bg-black filter brightness-50'}`} type='submit'>Place Order {info  ? <IoIosUnlock /> : <IoIosLock />} </button>
            </form>

        </div>
    )
}

export default Order
