import { useSelector } from 'react-redux';
import { RootState } from 'store';
import profileDefault from 'assets/images/profileDefault.png';
import styles from './CommentUserProfile.module.scss';
import getBadgeImagePath from 'utils/getBadgeImagePath';

function CommentUserProfile(props: { profileImage?: string; username?: string; checkedBadge?: string }) {
  const selectedBadge = useSelector((state: RootState) => state.selectedBadge);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        {props.profileImage ? (
          <img className={styles.userProfile} src={props.profileImage} alt='Profile' />
        ) : (
          <img src={profileDefault} className={styles.userProfile} />
        )}
        {props.checkedBadge && (
          <img src={getBadgeImagePath(selectedBadge.badge)} className={styles.userBadge} alt='Badge' />
        )}
      </div>
      {props.username && <span className={styles.userName}>{props.username}</span>}
    </div>
  );
}

export default CommentUserProfile;
