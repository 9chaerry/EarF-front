import { ReactComponent as ProfileImg } from 'assets/icons/profile.svg';
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
        <ProfileImg className={styles.notLoggedIn} />
      )}
    </>
  );
}

export default MyProfileImg;
