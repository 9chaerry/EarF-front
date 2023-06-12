import { useGetUserInfoQuery, useGetCommunityPostQuery } from 'api/communityApiSlice';
import CommentUserProfile from '../comment/CommentUserProfile';
import PostEditButton from '../common/PostEditButton';
import styles from './QuestionPostingBoard.module.scss';
import getPostingDate from 'utils/getPostingDate';
import HeartReaction from '../common/HeartReaction';

function UserPostContent(props: { postId: string }) {
  const postId = props.postId;

  const { data: postInfo } = useGetCommunityPostQuery(postId);
  const { data: userInfo } = useGetUserInfoQuery();

  return (
    <div className={styles.contentContainer}>
      {postInfo && (
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
      )}
      {postInfo && (
        <div className={styles.textContainer}>
          <p className={styles.title}>{postInfo.title}</p>
          <p className={styles.content}>{postInfo.content}</p>
        </div>
      )}
      {postInfo && (
        <div className={styles.reactionContainer}>
          <span>{postInfo.numComments} 개의 댓글</span>
          <HeartReaction />
        </div>
      )}
    </div>
  );
}

export default UserPostContent;
