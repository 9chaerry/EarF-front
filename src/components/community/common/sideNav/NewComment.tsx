import { ReactComponent as Message } from 'assets/icons/Message.svg';
import styles from './NewComment.module.scss';

export default function NewComment(props: { title: string; comment: string }) {
  const commentText = `${props.comment.split('.').slice(0, 2).join('. ')}.`;
  const titleText = `${props.title.split('').slice(0, 8).join('')}...`;

  return (
    <div className={styles.container}>
      <div className={styles.commentContainer}>
        <Message />
        <span>{commentText}</span>
      </div>
      <p>{titleText}</p>
    </div>
  );
}