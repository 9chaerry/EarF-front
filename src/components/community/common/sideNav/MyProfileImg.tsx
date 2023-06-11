import profileDefault from 'assets/images/profileDefault.png';
import styles from './MyProfileImg.module.scss';
import { useGetUserInfoQuery } from 'api/communityApiSlice';

function MyProfileImg() {
  const { data: userInfo, isLoading } = useGetUserInfoQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userInfo && userInfo.profileImage ? (
        <img src={userInfo.profileImage} className={styles.imgContainer} />
      ) : (
        <img src={profileDefault} className={styles.notLoggedIn} />
      )}
    </>
  );
}

export default MyProfileImg;
