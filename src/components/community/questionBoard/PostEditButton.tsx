import { Link } from 'react-router-dom';
import { ReactComponent as Edit } from 'assets/icons/PostEdit.svg';
import { ReactComponent as Delete } from 'assets/icons/Delete.svg';
import styles from './PostEditButton.module.scss';

type EditProps = {
  postId: string;
};

function PostEditButton({ postId }: EditProps) {
  return (
    <div className={styles.container}>
      <Link to={`/community/question/${postId}/edit`}>
        <Edit />
      </Link>
      <Delete />
    </div>
  );
}

export default PostEditButton;
