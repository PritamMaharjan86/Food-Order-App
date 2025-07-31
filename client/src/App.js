import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [menu, setMenu] = useState([]);
  const [orderData, setOrderData] = useState('');


  useEffect(() => {
    axios.get('http://localhost:3001/api/menu')
      .then((res) => setMenu(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = () => {
    alert('Order Placed!');
  }


  return (
    <div className='bg-black h-screen'>
      <h2 className='font-bold text-white text-xl'>Menu</h2>
      <ul className='text-white '>
        {menu.map(item =>
        (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        )
        )}
      </ul>

      <form onSubmit={handleSubmit}>

        <div className='flex flex-col w-48 m-3 gap-2 '>
          <input className='p-1 rounded-md m-1' type='text' placeholder='Name' />
          <input className='p-1 rounded-md m-1' type='text' placeholder='Phone' />
        </div>

        <div className='text-white flex flex-col gap-1 w-1/4 justify-center m-3'>
          <label className='items-center flex gap-2'>
            <input type='radio' placeholder='Burger' /> Burger
            <input type='radio' placeholder='Pizza' /> Pizza
            <input type='radio' placeholder='Fries' /> Fries
          </label>
        </div>

        <button className='text-black border border-green-200 m-3 p-1 rounded-lg bg-green-600' type='submit'>Place Order</button>
      </form>
    </div>

  );
}

export default App;
