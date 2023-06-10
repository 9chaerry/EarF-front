import { Link } from 'react-router-dom';
import MyProfileImg from './MyProfileImg';
import styles from './MyProfile.module.scss';
import { useGetUserInfoQuery } from 'api/communityApiSlice';

function MyProfile() {
  const { data: userInfo } = useGetUserInfoQuery();

  return (
    <div className={styles.container}>
      <MyProfileImg />
      <div className={styles.userInfo}>
        <div className={styles.userName}>
          {!userInfo ? (
            <Link to='/login'>
              <span className={styles.notLoggedIn}>로그인</span>
            </Link>
          ) : (
            <span>{userInfo.name}</span>
          )}
          {userInfo && <img className={styles.userBadge} />}
        </div>
        {!userInfo ? (
          <span className={`${styles.notLoggedIn} ${styles.userPostingNumber}`}>하러가기</span>
        ) : (
          <div className={styles.userPostingNumber}>
            <span>작성한 글</span>
            <Link to='/mypage/mycommunity'>
              <button>{userInfo.postNum} 개</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
