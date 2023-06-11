import getPostingTime from 'utils/getPostingTime';
import UserProfileImage from '../common/sideNav/UserProfile';
import PostEditButton from './PostEditButton';
import { useGetUserInfoQuery } from 'api/communityApiSlice';
import { ReactComponent as Heart } from 'assets/icons/Heart.svg';
import { ReactComponent as Comment } from 'assets/icons/Comment.svg';
import { QuestionPost } from 'types/types';
import styles from './QuestionPostingItem.module.scss';

type QuestionPostingItemProps = Omit<QuestionPost, 'checkedBadge' | 'commentIds' | 'updatedAt' | '__v'>;

function QuestionPostingItem({
  _id,
  id,
  title,
  content,
  createdAt,
  name,
  profileImage,
  numComments,
  numLikes,
}: QuestionPostingItemProps) {
  const { data: userInfo } = useGetUserInfoQuery();
  const contentText = `${content.split('.').slice(0, 5).join('.')}`;

  return (
    <li className={styles.container}>
      <div className={styles.userEditContainer}>
        <span className={styles.postingDate}>{getPostingTime(createdAt)}</span>
        {userInfo && userInfo.id === id ? <PostEditButton postId={_id} /> : ''}
      </div>
      <div className={styles.contentContainer}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.content}>{contentText}</p>
        </div>
      </div>
      <div className={styles.userContainer}>
        <div>
          <UserProfileImage username={name} profileImage={profileImage} />
        </div>
        <div className={styles.userReactionContainer}>
          <div className={styles.reactionContainer}>
            <Heart />
            <span className={styles.reactionNumber}>{numLikes}</span>
          </div>
          <div className={styles.reactionContainer}>
            <Comment />
            <span className={styles.reactionNumber}>{numComments}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default QuestionPostingItem;
