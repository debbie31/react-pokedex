import { useEffect, useState } from 'react';
import NavBarItem from '../NavBarItem';
import style from './style.module.css';

function NavBar() {
  const [items, setItems] = useState([]);

  const fetchTypes = async () => {
    // Try not to mix the usage of .then and async/await
    // For this example, this is acceptable
    const response = await fetch('https://pokeapi.co/api/v2/type').then((res) =>
      res.json()
    );

    // You can handle any errors using the try...catch
    setItems(response.results);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <>
      <div>
        <h1 className={style.title}>Pokédex</h1>
      </div>
      <div className={style.navBar}>
        {items.map((item) => (
          // Always add `key` props on lists
          <NavBarItem key={item.id} type={item.name}>
            {item.name}
          </NavBarItem>
        ))}
      </div>
    </>
  );
}

export default NavBar;
