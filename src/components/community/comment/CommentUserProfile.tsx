import { ReactComponent as ProfileImg } from 'assets/icons/profile.svg';
import styles from './CommentUserProfile.module.scss';
import getBadgeImagePath from 'utils/getBadgeImagePath';

function CommentUserProfile(props: { profileImage?: string; username?: string; checkedBadge?: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        {props.profileImage ? (
          <img className={styles.userProfile} src={props.profileImage} alt='Profile' />
        ) : (
          <ProfileImg className={styles.userProfile} />
        )}
        {props.checkedBadge && (
          <img src={getBadgeImagePath(props?.checkedBadge)} className={styles.userBadge} alt='Badge' />
        )}
      </div>
      {props.username && <span className={styles.userName}>{props.username}</span>}
    </div>
  );
}

export default CommentUserProfile;
