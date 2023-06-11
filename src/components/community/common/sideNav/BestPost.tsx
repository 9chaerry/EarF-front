import UserReaction from '../UserReaction';
import styles from './BestPost.module.scss';

interface BestLikesDataProps {
  _id: string;
  title: string;
  numComments: number;
  numLikes: number;
}
export default function BestPost({ _id, title, numComments, numLikes }: BestLikesDataProps) {
  return (
    <li className={styles.container} id={_id}>
      <p>{title}</p>
      <div>
        <UserReaction numComments={numComments} numLikes={numLikes} />
      </div>
    </li>
  );
}
