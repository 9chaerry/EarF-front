import axios from 'axios';
import styles from './SideNav.module.scss';
import { NavLink } from 'react-router-dom';

const SERVER_URL = 'http://localhost:3000';

interface NavLinkItem {
  to: string;
  label: string;
}

const navLinks: NavLinkItem[] = [
  { to: '/mypage/info', label: '내 정보' },
  { to: '/mypage/mycommunity', label: '내 게시물' },
  { to: '/mypage/badge', label: '뱃지' },
];

function SideNav() {
  async function handleLogout() {
    try {
      await axios.get(`${SERVER_URL}/api/user/logout`);
      // 로그아웃이 됐다는 알림을 modal로?
    } catch (error) {
      console.error('로그아웃 실패', error);
    }
  }
  return (
    <div className={styles.sideNavigation}>
      <ul>
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive, isPending }) => (isPending ? styles.inactive : isActive ? styles.active : '')}
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li onClick={handleLogout}>로그아웃</li>
      </ul>
    </div>
  );
}

export default SideNav;
