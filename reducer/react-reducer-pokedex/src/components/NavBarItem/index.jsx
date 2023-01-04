import style from './style.module.css';
import { Link } from 'react-router-dom';

function NavBarItem({ type, children }) {
  return (
    <div className={style.navBarItem}>
      <Link to={`/type/${type}`}>{children}</Link>
    </div>
  );
}

export default NavBarItem;
