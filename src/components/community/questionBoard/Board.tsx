import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { getCommunityPosts } from 'api/fetcher';
import { ReactComponent as Chat } from 'assets/icons/Search.svg';
import { ReactComponent as Post } from 'assets/icons/Pencil.svg';
import { ReactComponent as Circle } from 'assets/icons/Circle.svg';
import { ReactComponent as Top } from 'assets/icons/ArrowUp.svg';
import QuestionPostingItem from './QuestionPostingItem';
import UnsolvedQuestion from './UnsolvedQuestion';
import { QuestionPost } from 'types/types';
import styles from './Board.module.scss';

function Board() {
  const [postData, setPostData] = useState<QuestionPost[] | undefined>();

  // 스크롤링
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 검색 이벤트
  const handleSubmitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('검색동작');
  };
  const pressEnterSearch: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      //키를 눌렀을 때 동작할 코드
      e.preventDefault();
      console.log('검색동작');
    }
  };

  // 작성하기 버튼 페이지 이동
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handlePostingClick = () => {
    if (!token) {
      const confirmMessage = '로그인 후 작성이 가능합니다.';
      const shouldRedirect = window.confirm(confirmMessage);

      if (shouldRedirect) {
        navigate('/login');
      }
    } else {
      navigate('/community/post');
    }
  };

  // 페이지네이션
  const [page, setPage] = useState(1);
  const movePage = (page: number) => {
    setPage(page);
  };

  // 게시글 데이터
  useEffect(() => {
    getQuestionPosts();
  });

  async function getQuestionPosts(): Promise<void> {
    try {
      const response = await getCommunityPosts();
      const questionPosts = response as QuestionPost[];
      setPostData(questionPosts);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={handleSubmitSearch} className={styles.searchContainer}>
          <input
            type='text'
            className={styles.searchInput}
            placeholder='궁금한 질문을 검색해보세요!'
            onKeyPress={pressEnterSearch}
          />
          <button type='submit' className={styles.searchButton}>
            <Chat />
          </button>
        </form>
        <div className={styles.unsolved}>
          <span>답변을 기다리고 있어요</span>
          <UnsolvedQuestion />
        </div>
      </div>
      <div className={styles.boardTopContainer}>
        {!token ? (
          <button onClick={handlePostingClick} className={styles.postingButton}>
            <Post className={styles.postingSvg} />
            작성하기
          </button>
        ) : (
          <Link to='/community/post' className={styles.postingButton}>
            <Post className={styles.postingSvg} />
            작성하기
          </Link>
        )}
        <div className={styles.sortingContainer}>
          <ul>
            <li>
              <Circle />
              최신순
            </li>
            <li>
              <Circle />
              댓글순
            </li>
            <li>
              <Circle />
              추천순
            </li>
          </ul>
        </div>
      </div>
      <ul>
        {postData &&
          postData.map((post) => (
            <QuestionPostingItem
              key={post._id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              id={post.id}
              name={post.name}
              profileImage={post.profileImage}
              numComments={post.numComments}
              likeIds={post.likeIds}
            />
          ))}
      </ul>
      <div>
        <div className={styles.pageContainer}>
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={50}
            pageRangeDisplayed={5}
            prevPageText='‹'
            nextPageText='›'
            onChange={movePage}
          />
        </div>
      </div>
      <div className={styles.scrollContainer}>
        <button onClick={scrollToTop} type='button'>
          <Top />
        </button>
      </div>
    </div>
  );
}

export default Board;
