import { useState, useEffect, MouseEvent } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import axios from 'axios';
import { getToken, removeToken, removeAccessTokenTime } from '../../api/token';
import profileIcon from '../../assets/icons/profile.svg';
import MainLogo from '../../assets/icons/MainLogo.svg';

function Header(): JSX.Element {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = getToken();

      if (token) {
        try {
          const response = await axios.get('http://34.64.216.86/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { name } = response.data;
          setUserName(name);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Failed to fetch user information:', error);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus(); // Call the function immediately when the component mounts
  }, []);

  // 로그아웃시 access, refrest 토큰 제거
  const handleLogout = () => {
    removeToken();
    removeAccessTokenTime();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleMouseOver = () => {
    setShowSideMenu(true);
  };

  const handleMouseLeave = () => {
    setShowSideMenu(false);
  };

  const handleMyPageClick = (e: MouseEvent) => {
    navigate('/mypage/info');
  };

  return (
    <header>
      <div className={styles.inner}>
        <div>
          <Link to='/' className={styles.logo}>
            <div>
              <img src={MainLogo} alt='메인로고' />
            </div>
            <strong>EarF</strong>
          </Link>
          <ul className={styles.menu}>
            <li>
              <NavLink to='/calender' className={({ isActive }) => (isActive ? 'active' : '')}>
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
          {isLoggedIn ? (
            <div className={styles.login} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
              <div className={styles.infoBox} onClick={handleMyPageClick}>
                <span>안녕하세요, {userName}님</span>
              </div>
              <div className={styles.imgBox}>
                <img src={profileIcon} alt='profile' />
              </div>
              {showSideMenu && ( // showSideMenu 상태에 따라 사이드 메뉴 표시 여부 결정
                <div className={styles.sideMenu}>
                  <NavLink to='/mypage/info'>내 정보</NavLink>
                  <NavLink to='/mypage/mycommunity'>내 게시글</NavLink>
                  <NavLink to='/mypage/badge'>뱃지</NavLink>
                  <button onClick={handleLogout}>로그아웃</button>
                </div>
              )}
            </div>
          ) : (
            <Link to='/login' className={styles.loginButton}>
              시작하기
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
