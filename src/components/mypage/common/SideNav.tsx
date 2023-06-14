import styles from './SideNav.module.scss';
import { NavLink } from 'react-router-dom';
import { userLogout } from 'api/fetcher';
import { userLogout } from 'api/Fetcher';
import { RemoveToken } from 'components/common/token';

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
      await userLogout();
      RemoveToken();
      console.log('로그아웃이 완료되었습니다');
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
