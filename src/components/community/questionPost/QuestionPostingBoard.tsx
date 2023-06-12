import { useGetCommunityPostQuery } from 'api/communityApiSlice';
import UserComments from '../comment/UserComments';
import styles from './QuestionPostingBoard.module.scss';
import { ReactComponent as Top } from 'assets/icons/ArrowUp.svg';
import { useState, useEffect } from 'react';
import UserPostContent from './UserPostContent';

function QuestionPostingBoard() {
  const [postId, setPostId] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const postId = url.pathname.split('/')[3];
    setPostId(postId);
  }, []);

  const { data: postInfo } = useGetCommunityPostQuery(postId);

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
      {postInfo && <UserPostContent postId={postInfo._id} />}
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
