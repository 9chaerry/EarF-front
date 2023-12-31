import { Link } from 'react-router-dom';
import UserProfile from './sideNav/MyProfile';
import styles from './SideNav.module.scss';

function SideNav() {
  return (
    <div>
      <aside className={styles.container}>
        <UserProfile />
        <hr />
        <nav>
          <ul>
            <Link to='/community'>
              <li>질문해요</li>
            </Link>
            <Link to='/community/boast'>
              <li>자랑해요</li>
            </Link>
            <li>함께해요</li>
            <li>소개해요</li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default SideNav;
