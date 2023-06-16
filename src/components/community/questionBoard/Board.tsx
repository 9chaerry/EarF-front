import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useGetSearchQuery,
  useGetAllCommunityPostsQuery,
  useGetCommunityPostsQuery,
  useGetMostCommentsCommunityPostsQuery,
  useGetMostLikesCommunityPostsQuery,
} from 'api/communityApiSlice';
import Pagination from 'react-js-pagination';
import { ReactComponent as Chat } from 'assets/icons/Search.svg';
import { ReactComponent as Post } from 'assets/icons/Pencil.svg';
import { ReactComponent as Circle } from 'assets/icons/Circle.svg';
import { ReactComponent as Top } from 'assets/icons/ArrowUp.svg';
import QuestionPostingItem from './QuestionPostingItem';
import { PuffLoader } from 'react-spinners';
import errorCommunity from 'assets/images/errorCommunity.png';
import styles from './Board.module.scss';
import UnsolvedQuestionSwiper from './UnsolvedQuestionSwiper';

function Board() {
  const [page, setPage] = useState(1);
  const [activeSorting, setActiveSorting] = useState('recent');
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState('');

  const { data: allPostData } = useGetAllCommunityPostsQuery();

  useEffect(() => {
    if (allPostData) {
      setTotalItemsCount(allPostData.length);
    }
  }, [allPostData]);

  const { data: searchData, isLoading: isSearchLoading } = useGetSearchQuery(searchQuery);

  const { data: postData, isLoading: isPostLoading, error: postError } = useGetCommunityPostsQuery(page);
  const {
    data: mostCommentsData,
    isLoading: isMostCommentsLoading,
    error: mostCommentsError,
  } = useGetMostCommentsCommunityPostsQuery(page);
  const {
    data: mostLikesData,
    isLoading: isMostLikesLoading,
    error: mostLikesError,
  } = useGetMostLikesCommunityPostsQuery(page);

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
    setSearchQuery(search);
  };
  const pressEnterSearch: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchQuery(search);
    }
  };
  const handleClickSearch: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setSearchQuery(search);
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
  const movePage = (page: number) => {
    setPage(page);
  };

  // 정렬 기준 변경 이벤트
  const handleSortingClick = (sorting: string) => {
    setActiveSorting(sorting);
  };
  let sortedData = searchData || postData;
  let isLoading = isSearchLoading || isPostLoading;
  let error = postError;
  if (activeSorting === 'recent') {
    sortedData = postData;
    isLoading = isPostLoading;
    error = postError;
  }
  if (activeSorting === 'comments') {
    sortedData = mostCommentsData;
    isLoading = isMostCommentsLoading;
    error = mostCommentsError;
  } else if (activeSorting === 'likes') {
    sortedData = mostLikesData;
    isLoading = isMostLikesLoading;
    error = mostLikesError;
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
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type='submit' className={styles.searchButton} onClick={handleClickSearch}>
            <Chat />
          </button>
        </form>
        <UnsolvedQuestionSwiper />
      </div>
      <div className={styles.boardTopContainer}>
        {!token ? (
          <button onClick={handlePostingClick} className={styles.postingButton}>
            <Post className={styles.postingSvg} />
            작성하기
          </button>
        ) : (
          <Link to='/community/question/post' className={styles.postingButton}>
            <Post className={styles.postingSvg} />
            작성하기
          </Link>
        )}
        <div className={styles.sortingContainer}>
          <ul>
            <li
              onClick={() => {
                handleSortingClick('recent');
                setPage(1);
                scrollToTop();
              }}
              className={activeSorting === 'recent' ? styles.activeSorting : ''}
            >
              <Circle />
              최신순
            </li>
            <li
              onClick={() => {
                handleSortingClick('comments');
                setPage(1);
                scrollToTop();
              }}
              className={activeSorting === 'comments' ? styles.activeSorting : ''}
            >
              <Circle />
              댓글순
            </li>
            <li
              onClick={() => {
                handleSortingClick('likes');
                setPage(1);
                scrollToTop();
              }}
              className={activeSorting === 'likes' ? styles.activeSorting : ''}
            >
              <Circle />
              추천순
            </li>
          </ul>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <PuffLoader color='#24AE63' loading size={100} />
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <img src={errorCommunity} />
          게시글을 불러오지 못했습니다.
        </div>
      ) : (
        <ul>
          {sortedData &&
            sortedData?.map((post) => (
              <QuestionPostingItem
                key={post._id}
                _id={post._id}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
                id={post.id}
                name={post.name}
                profileImage={post.profileImage}
                numComments={post.numComments}
                numLikes={post.numLikes}
              />
            ))}
        </ul>
      )}
      <div>
        <div className={styles.pageContainer}>
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={5}
            prevPageText='‹'
            nextPageText='›'
            onChange={(selectedPage) => movePage(selectedPage)}
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
