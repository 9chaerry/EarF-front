import UserReaction from '../UserReaction';
import styles from './BestPost.module.scss';
import { Link } from 'react-router-dom';
import { userInfo } from 'api/fetcher';
import { User } from 'types/types';

async function isLoggedIn(): Promise<string> {
  const userData: User = (await userInfo()) as User;
  const defaultBadge = userData.checkedBadge;
  console.log(defaultBadge);
  return defaultBadge;
}
isLoggedIn();
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
