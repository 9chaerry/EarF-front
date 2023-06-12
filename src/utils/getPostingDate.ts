import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const getPostingDate = (date: string): string => {
  const dataDate = dayjs(date).locale('ko');

  return dataDate.format('YYYY.MM.DD HH:mm');
};

export default getPostingDate;
