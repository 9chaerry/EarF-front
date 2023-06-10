import { Link } from 'react-router-dom';
import MyProfile from './sideNav/MyProfile';
import styles from './LeftSideNav.module.scss';

function LeftSideNav() {
  return (
    <div>
      <aside className={styles.container}>
        <MyProfile />

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

export default LeftSideNav;
