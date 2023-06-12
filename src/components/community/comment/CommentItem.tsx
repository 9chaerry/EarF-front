import { useState, useRef } from 'react';
import { useGetUserInfoQuery, useEditCommentMutation } from 'api/communityApiSlice';
import HeartReaction from '../common/HeartReaction';
import PostEditButton from '../common/PostEditButton';
import styles from './CommentItem.module.scss';
import CommentUserProfile from './CommentUserProfile';
import { Comment } from 'types/types';
import getPostingDate from 'utils/getPostingDate';
import Button from 'components/common/Button';

type CommentProps = Omit<Comment, 'likeIds' | 'updatedAt' | '__v'>;

function CommentItem({
  _id,
  id,
  postId,
  name,
  profileImage,
  checkedBadge,
  comment: initialComment,
  createdAt,
  numLikes,
}: CommentProps) {
  const { data: userInfo } = useGetUserInfoQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(initialComment);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [editCommentMutation] = useEditCommentMutation();

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleEditPatch = async () => {
    try {
      const result = await editCommentMutation({ postId: postId, commentId: _id, comment });
      result && setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const autoResizeHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  return (
    <li className={styles.commentItemContainer}>
      <div className={styles.commentEditContainer}>
        <div className={styles.commentUserContainer}>
          <CommentUserProfile profileImage={profileImage} checkedBadge={checkedBadge} />
          <div>
            <p className={styles.userName}>{name}</p>
            <p className={styles.postingDate}>
              <span>작성일</span>
              <span>{getPostingDate(createdAt)}</span>
            </p>
          </div>
        </div>
        {userInfo && userInfo.id === id && <PostEditButton commentId={_id} postId={postId} onEditClick={handleEdit} />}
      </div>
      <hr />
      {isEditing ? (
        <div className={styles.editContainer}>
          <textarea
            rows={1}
            className={styles.content}
            value={comment}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              autoResizeHeight();
              handleCommentChange(event);
            }}
            ref={textareaRef}
            spellCheck='false'
          />
          <div className={styles.buttonContainer}>
            <Button text='취소' className='whiteButton' onClick={handleCancelEdit} />
            <Button text='수정' onClick={handleEditPatch} />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.comment}>{comment}</div>
          <div className={styles.reactionContainer}>
            <HeartReaction numLikes={numLikes} />
          </div>
        </>
      )}
    </li>
  );
}

export default CommentItem;
