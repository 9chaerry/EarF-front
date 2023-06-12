import { useDeleteCommunityPostMutation } from 'api/communityApiSlice';
import { Link } from 'react-router-dom';
import { ReactComponent as Edit } from 'assets/icons/PostEdit.svg';
import { ReactComponent as Delete } from 'assets/icons/Delete.svg';
import styles from './PostEditButton.module.scss';

function PostEditButton(props: { _id: string }) {
  const [deleteCommunityPostMutation] = useDeleteCommunityPostMutation();

  const handleDelete = () => {
    const confirmed = window.confirm('게시글을 삭제하면 복구할 수 없습니다. 정말로 삭제하시겠습니까?');
    if (confirmed) {
      deleteCommunityPostMutation({ id: props._id });
    }
  };

  return (
    <div className={styles.container}>
      <Link to={`/community/question/${props._id}/edit`}>
        <Edit />
      </Link>
      <Delete onClick={handleDelete} />
    </div>
  );
}

export default PostEditButton;
