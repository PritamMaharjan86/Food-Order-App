import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [menu, setMenu] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [item, setItem] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3001/api/menu')
      .then((res) => setMenu(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = { name, phone, item, };

    try {
      const response = await axios.post('http://localhost:3001/api/order', orderData);
      alert(response.data.message);
    }
    catch (error) {
      console.error('Error sending order:', error);
      alert('Order failed to place!')
    }


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
          <input className='p-1 rounded-md m-1' type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} />
          <input className='p-1 rounded-md m-1' type='text' placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className='text-white flex flex-col gap-1 w-1/4 justify-center m-3'>
          {['Burger', 'Pizza', 'Fries', 'Momo','Noodles','Fried Rice'].map((food) => (
            <label key={food} className='items-center flex gap-2'>
              <input
                type='radio'
                name='item'
                value={food}
                onChange={(e) => setItem(e.target.value)}
              /> {food}
            </label>
          ))}
        </div>



        <button className='text-black border border-green-200 m-3 p-1 rounded-lg bg-green-600' type='submit'>Place Order</button>
      </form>
    </div>

  );
}

export default App;
