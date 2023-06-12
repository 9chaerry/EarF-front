import HeartReaction from '../common/HeartReaction';
import styles from './CommentItem.module.scss';
import CommentUserProfile from './CommentUserProfile';

function CommentItem() {
  return (
    <li className={styles.commentItemContainer}>
      <div className={styles.commentUserContainer}>
        <CommentUserProfile />
        <div>
          <p className={styles.userName}>EarF</p>
          <p className={styles.postingDate}>
            <span>작성일</span>
            <span>2023.06.02 16:30</span>
          </p>
        </div>
      </div>
      <hr />
      <div>댓글내용</div>
      <div className={styles.reactionContainer}>
        <HeartReaction />
      </div>
    </li>
  );
}

export default CommentItem;
