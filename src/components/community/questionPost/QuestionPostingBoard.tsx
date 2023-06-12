import { useGetUserInfoQuery, useGetCommunityPostQuery } from 'api/communityApiSlice';
import CommentUserProfile from '../comment/CommentUserProfile';
import UserComments from '../comment/UserComments';
import PostEditButton from '../common/PostEditButton';
import styles from './QuestionPostingBoard.module.scss';
import getPostingDate from 'utils/getPostingDate';
import HeartReaction from '../common/HeartReaction';
import { ReactComponent as Top } from 'assets/icons/ArrowUp.svg';

function QuestionPostingBoard() {
  const url = new URL(window.location.href);
  const postId = url.pathname.split('/')[3];

  const { data: postInfo } = useGetCommunityPostQuery(postId);
  const { data: userInfo } = useGetUserInfoQuery();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <span>커뮤니티</span>
        <span>질문해요</span>
      </div>
      {postInfo && (
        <div className={styles.contentContainer}>
          <div className={styles.postUserContainer}>
            <div className={styles.userContainer}>
              <CommentUserProfile profileImage={postInfo.profileImage} checkedBadge={postInfo.checkedBadge} />
              <div>
                <p className={styles.userName}>{postInfo.name}</p>
                <p className={styles.postingDate}>
                  <span>작성일</span>
                  <span>{getPostingDate(postInfo.createdAt)}</span>
                </p>
              </div>
            </div>
            {userInfo && postInfo && userInfo.id === postInfo.id ? <PostEditButton _id={postInfo._id} /> : ''}
          </div>
          <div className={styles.textContainer}>
            <p className={styles.title}>{postInfo.title}</p>
            <p className={styles.content}>{postInfo.content}</p>
          </div>
          <div className={styles.reactionContainer}>
            <span>{postInfo.numComments} 개의 댓글</span>
            <HeartReaction />
          </div>
        </div>
      )}
      {postInfo && <UserComments />}
      <div className={styles.scrollContainer}>
        <button onClick={scrollToTop} type='button'>
          <Top />
        </button>
      </div>
    </div>
  );
}

export default QuestionPostingBoard;
