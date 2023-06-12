import getPostingTime from 'utils/getPostingTime';
import styles from './UnsolvedQuestion.module.scss';
import UserProfile from '../common/sideNav/UserProfile';

interface UnsolvedQuestionProps {
  _id: string;
  title: string;
  createdAt: string;
  name: string;
  profileImage: string;
}

function UnsolvedQuestion({ _id, title, createdAt, name, profileImage }: UnsolvedQuestionProps) {
  return (
    <li className={styles.questionContainer} id={_id}>
      <UserProfile profileImage={profileImage} username={name} />
      <p>{title}</p>
      <p>{getPostingTime(createdAt)}</p>
    </li>
  );
}

export default UnsolvedQuestion;
