import getPostingTime from 'utils/getPostingTime';
import styles from './UnsolvedQuestion.module.scss';
import UserProfile from '../common/sideNav/UserProfile';
import { Link } from 'react-router-dom';

interface UnsolvedQuestionProps {
  _id: string;
  title: string;
  createdAt: string;
  name: string;
  profileImage: string;
}

function UnsolvedQuestion({ _id, title, createdAt, name, profileImage }: UnsolvedQuestionProps) {
  return (
    <li id={_id}>
      <Link to={`/community/question/${_id}`} className={styles.questionContainer}>
        <UserProfile profileImage={profileImage} username={name} />
        <p>{title}</p>
        <p>{getPostingTime(createdAt)}</p>
      </Link>
    </li>
  );
}

export default UnsolvedQuestion;
