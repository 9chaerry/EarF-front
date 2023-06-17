import { useGetAllCommentsQuery } from 'api/communityApiSlice';
import { useGetUserInfoQuery, useCreateCommentMutation } from 'api/communityApiSlice';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentItem from './CommentItem';
import Button from 'components/common/Button';
import styles from './UserComments.module.scss';
import errorCommunity from 'assets/images/errorCommunity.png';
import profileDefault from 'assets/images/profileDefault.png';
import getBadgeImagePath from 'utils/getBadgeImagePath';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

function UserComments() {
  const selectedBadge = useSelector((state: RootState) => state.selectedBadge);
  const [showAllComments, setShowAllComments] = useState(false);
  const [comment, setComment] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const url = new URL(window.location.href);
  const postId = url.pathname.split('/')[3];

  const { data: commentInfo } = useGetAllCommentsQuery(postId);
  const { data: userInfo } = useGetUserInfoQuery();
  const [createCommentMutation] = useCreateCommentMutation();

  const handleToggleComments = () => {
    setShowAllComments((prevState) => !prevState);
  };

  const handleUserCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleCreateComment = async () => {
    if (!token) {
      const confirmResult = window.confirm(
        '댓글을 작성하시려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?'
      );
      if (confirmResult) {
        navigate('/login');
      }
    } else {
      try {
        const { data }: any = await createCommentMutation({ id: postId, comment });
        setComment('');
      } catch (error) {
        console.log('댓글 생성 실패:', error);
      }
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
    <div className={styles.container}>
      {commentInfo && commentInfo.length === 0 ? (
        <div className={styles.errorContainer}>
          <img src={errorCommunity} />
          댓글이 없습니다! 새로운 댓글을 작성해보세요.
        </div>
      ) : (
        <>
          {commentInfo && commentInfo.length > 2 ? (
            <div className={styles.allCommentsButton} onClick={handleToggleComments} style={{ cursor: 'pointer' }}>
              {showAllComments ? '전체댓글숨기기' : '전체댓글보기'}
            </div>
          ) : (
            <div className={styles.allCommentsButton} style={{ borderBottom: 0 }}></div>
          )}
          <ul>
            {commentInfo &&
              commentInfo
                .slice(showAllComments ? -commentInfo.length : -2)
                .map((comments) => (
                  <CommentItem
                    key={comments._id}
                    _id={comments._id}
                    id={comments.id}
                    postId={comments.postId}
                    name={comments.name}
                    profileImage={comments.profileImage}
                    checkedBadge={comments.checkedBadge}
                    comment={comments.comment}
                    createdAt={comments.createdAt}
                    likeIds={comments.likeIds}
                  />
                ))}
          </ul>
        </>
      )}
      <div className={styles.userCommentContainer}>
        <div>
          <div className={styles.userProfileContainer}>
            {userInfo && userInfo.profileImage ? (
              <img src={userInfo.profileImage} className={styles.userProfile} />
            ) : (
              <img src={profileDefault} className={styles.userProfile} />
            )}
            {userInfo && <img src={getBadgeImagePath(selectedBadge.badge)} className={styles.userBadge} alt='Badge' />}
          </div>
          {!token ? (
            <textarea rows={1} placeholder='로그인 후 댓글 작성이 가능합니다.' className={styles.content} disabled />
          ) : (
            <textarea
              rows={1}
              placeholder='댓글을 입력해주세요.'
              className={styles.content}
              spellCheck='false'
              value={comment}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                autoResizeHeight();
                handleUserCommentChange(event);
              }}
              ref={textareaRef}
            />
          )}
        </div>
        {!token && comment ? (
          <Button text='등록' disabled={true} onClick={handleCreateComment} />
        ) : (
          <Button text='등록' onClick={handleCreateComment} />
        )}
      </div>
    </div>
  );
}

export default UserComments;
