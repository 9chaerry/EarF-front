import UserReaction from '../UserReaction';
import styles from './BestPost.module.scss';
import { Link } from 'react-router-dom';

interface BestLikesDataProps {
  _id: string;
  title: string;
  numComments: number;
  numLikes: number;
}
export default function BestPost({ _id, title, numComments, numLikes }: BestLikesDataProps) {
  return (
    <li className={styles.container} id={_id}>
      <Link to={`/community/question/${_id}`}>
        <p className={styles.title}>{title}</p>
        <div className={styles.userReactionContainer}>
          <UserReaction numComments={numComments} numLikes={numLikes} />
        </div>
      </Link>
    </li>
  );
}
