import styles from './Header.module.scss';
import { useState, useEffect, MouseEvent } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { logout } from 'store/loginSlice';

import axios from 'axios';
import { getToken, clearLocalStorage } from '../../api/token';
import profileIcon from '../../assets/icons/profile.svg';
import MainLogo from '../../assets/icons/MainLogo.svg';
import { updateBadge } from 'api/fetcher';

function Header(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showSideMenu, setShowSideMenu] = useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  // 로그아웃시 access, refrest 토큰 제거
  const handleLogout = () => {
    clearLocalStorage();
    navigate('/login');
    dispatch(logout());
    alert('다음에 또 만나요! :D');
  };

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserData = async () => {
        const token = getToken();

        if (token) {
          try {
            const response = await axios.get('http://34.64.216.86/api/user', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const { name, profileImage } = response.data;
            setUserName(name);
            setProfileImage(profileImage);
            setShowSideMenu(false);
          } catch (error) {
            console.error('Failed to fetch user information:', error);
          }
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn]);

  const handleMouseOver = () => {
    setShowSideMenu(true);
  };

  const handleMouseLeave = () => {
    setShowSideMenu(false);
  };

  const handleMyPageClick = (e: MouseEvent) => {
    navigate('/mypage/info');
  };
  const handleUpdateBadge = (): void => {
    updateBadge();
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
              <NavLink
                to='/calender'
                className={({ isActive, isPending }) => (isPending ? styles.inactive : isActive ? styles.active : '')}
              >
                기록하기
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/community'
                className={({ isActive, isPending }) => (isPending ? styles.inactive : isActive ? styles.active : '')}
              >
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
                {profileImage !== 'http://34.64.216.86/images/undefined' ? (
                  <img src={profileImage} alt='profile' />
                ) : (
                  <img src={profileIcon} alt='profile' />
                )}
              </div>
              {showSideMenu && (
                <div className={styles.sideMenu}>
                  <NavLink to='/mypage/info'>내 정보</NavLink>
                  <NavLink to='/mypage/mycommunity'>내 게시글</NavLink>
                  <NavLink to='/mypage/badge' onClick={handleUpdateBadge}>
                    뱃지
                  </NavLink>
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
