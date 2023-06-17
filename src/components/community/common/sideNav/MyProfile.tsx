import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Link } from 'react-router-dom';
import MyProfileImg from './MyProfileImg';
import styles from './MyProfile.module.scss';
import { useGetUserInfoQuery, useGetMyQuestionQuery } from 'api/communityApiSlice';
import getBadgeImagePath from 'utils/getBadgeImagePath';

function MyProfile() {
  const selectedBadge = useSelector((state: RootState) => state.selectedBadge);
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: postInfo } = useGetMyQuestionQuery();
  const myBadge = localStorage.getItem('badge');

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
          {userInfo && myBadge && <img src={getBadgeImagePath(myBadge)} className={styles.userBadge} alt='Badge' />}
        </div>
        {!userInfo ? (
          <span className={`${styles.notLoggedIn} ${styles.userPostingNumber}`}>하러가기</span>
        ) : (
          <div className={styles.userPostingNumber}>
            <span>작성한 글</span>
            {postInfo && !undefined && (
              <Link to='/mypage/mycommunity'>
                <button>{postInfo.length} 개</button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
