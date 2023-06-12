import { useDeleteCommunityPostMutation, useDeleteCommentMutation } from 'api/communityApiSlice';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Edit } from 'assets/icons/PostEdit.svg';
import { ReactComponent as Delete } from 'assets/icons/Delete.svg';
import styles from './PostEditButton.module.scss';

interface PostEditButtonProps {
  _id?: string;
  commentId?: string;
  postId?: string;
  onEditClick?: () => void;
}
function PostEditButton({ _id, commentId, postId, onEditClick }: PostEditButtonProps) {
  const [deleteCommunityPostMutation] = useDeleteCommunityPostMutation();
  const [deleteCommentMutation] = useDeleteCommentMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (_id) {
      const confirmed = window.confirm('게시글을 삭제하면 복구할 수 없습니다. 정말로 삭제하시겠습니까?');
      if (confirmed) {
        try {
          await deleteCommunityPostMutation({ id: _id });
        } catch (err) {
          console.error(err);
        }
      }
    } else if (commentId && postId) {
      const confirmed = window.confirm('댓글을 삭제하면 복구할 수 없습니다. 정말로 삭제하시겠습니까?');
      if (confirmed) {
        try {
          await deleteCommentMutation({ postId: postId, commentId: commentId });
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  const handelEdit = async () => {
    if (_id) {
      navigate(`/community/question/${_id}/edit`);
    } else if (commentId && postId && onEditClick) {
      onEditClick();
    }
  };

  return (
    <div className={styles.container}>
      <Edit onClick={handelEdit} />
      <Delete onClick={handleDelete} />
    </div>
  );
}

export default PostEditButton;
