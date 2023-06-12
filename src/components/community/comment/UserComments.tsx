import { useRef } from 'react';
import CommentItem from './CommentItem';
import Button from 'components/common/Button';
import styles from './UserComments.module.scss';

function UserComments(props: { postId?: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const token = localStorage.getItem('token');

  const autoResizeHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.allCommentsButton}>전체댓글보기</div>
      <ul>
        <CommentItem />
        <CommentItem />
      </ul>
      <div className={styles.userCommentContainer}>
        <div>
          <div className={styles.userProfileContainer}>
            <div className={styles.userProfile}></div>
            <div className={styles.userBadge}></div>
          </div>
          {!token ? (
            <textarea rows={1} placeholder='로그인 후 댓글 작성이 가능합니다.' className={styles.content} disabled />
          ) : (
            <textarea
              rows={1}
              placeholder='댓글을 입력해주세요.'
              className={styles.content}
              onChange={autoResizeHeight}
              ref={textareaRef}
            />
          )}
        </div>
        {!token ? <Button text='등록' disabled={true} /> : <Button text='등록' />}
      </div>
    </div>
  );
}

export default UserComments;
