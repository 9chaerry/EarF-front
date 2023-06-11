import { useGetBestLikesCommunityPostsQuery, useGetLatestCommentQuery } from 'api/communityApiSlice';
import { Link } from 'react-router-dom';
import styles from './RightSideNav.module.scss';
import BestPost from './sideNav/BestPost';
import NewComment from './sideNav/NewComment';

function RightSideNav() {
  const { data: bestLikesData } = useGetBestLikesCommunityPostsQuery();
  const { data: lastCommentData } = useGetLatestCommentQuery();

  return (
    <div>
      <aside className={styles.container}>
        <ul className={styles.bestPostContainer}>
          <li className={styles.subTitle}>주간 인기글</li>
          {bestLikesData &&
            bestLikesData?.map((post) => (
              <BestPost
                key={post._id}
                _id={post._id}
                title={post.title}
                numComments={post.numComments}
                numLikes={post.numLikes}
              />
            ))}
        </ul>
        <div className={styles.newPostContainer}>
          <span className={styles.subTitle}>최신 댓글</span>
          {lastCommentData && <NewComment title={lastCommentData.title} comment={lastCommentData.content} />}
        </div>
      </aside>
    </div>
  );
}

export default RightSideNav;
