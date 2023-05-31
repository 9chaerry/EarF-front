import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
  return (
    <header>
      <div className={styles.inner}>
        <div>
          <Link to='/' className={styles.logo}>
            로고
          </Link>
          <ul className={styles.menu}>
            <li>
              <NavLink to='/home' className={({ isActive }) => (isActive ? 'active' : '')}>
                기록하기
              </NavLink>
            </li>
            <li>
              <NavLink to='/community' className={({ isActive }) => (isActive ? 'active' : '')}>
                커뮤니티
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <Link to='/login' className={styles.button}>
            시작하기
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
