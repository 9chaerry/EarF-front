import { ReactComponent as Comment } from 'assets/icons/Comment.svg';
import { ReactComponent as Heart } from 'assets/icons/Heart.svg';
import styles from './UserReaction.module.scss';

interface UserReactionProps {
  numComments?: number;
  numLikes?: number;
}

function UserReaction({ numComments, numLikes }: UserReactionProps) {
  return (
    <div className={styles.container}>
      <div className={styles.reactionContainer}>
        <Heart />
        <span className={styles.reactionNumber}>{numLikes}</span>
      </div>
      <div className={styles.reactionContainer}>
        <Comment />
        <span className={styles.reactionNumber}>{numComments}</span>
      </div>
    </div>
  );
}

export default UserReaction;
