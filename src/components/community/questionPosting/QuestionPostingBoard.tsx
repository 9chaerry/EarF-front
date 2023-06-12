import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';
import PostingContent from './PostingContent';
import styles from './QuestionPostingBoard.module.scss';
import { useCreateCommunityPostMutation } from 'api/communityApiSlice';
import { useState } from 'react';

function QuestionPostingBoard() {
  const navigate = useNavigate();

  const [createCommunityPostMutation] = useCreateCommunityPostMutation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleCreatePost = async () => {
    try {
      const { data }: any = await createCommunityPostMutation({ title, content });
      console.log('게시글 등록 성공:', data);
      navigate(`/community/question/${data._id}`);
    } catch (error) {
      console.log('게시글 등록 실패:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <span>커뮤니티</span>
        <span>질문해요</span>
      </div>
      <PostingContent
        title={title}
        content={content}
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
      />
      <div className={styles.buttonContainer}>
        <Link to='/community'>
          <Button text='취소' className='whiteButton' />
        </Link>
        <Button text='등록' onClick={handleCreatePost} />
      </div>
    </div>
  );
}

export default QuestionPostingBoard;
