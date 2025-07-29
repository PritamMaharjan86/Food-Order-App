import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/menu')
      .then((res) => setMenu(res.data))
      .catch((err) => console.error(err));
  }, []);


  return (
    <div className='bg-black'>
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
    </div>

  );
}

export default App;
