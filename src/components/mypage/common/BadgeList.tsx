import { badgeImg1, badgeImg2, badgeImg3, badgeImg4, badgeImg5, badgeImg6, badgeImg7 } from 'utils/badgeIndex';
import { userInfo } from 'api/fetcher';
import { useEffect, useState } from 'react';

interface BadgeInfo {
  type: string;
  name: string;
  isGet: boolean;
  url: string;
  info: string;
}

interface Badge {
  type: string;
  ThumbBadge: string;
}

interface User {
  id: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  badges: Badge[];
  postNum: number;
  tumblerNum: number;
  transportNum: number;
  basketNum: number;
  refreshToken: string;
}

const initialBadgeList: BadgeInfo[] = [
  {
    type: '신규',
    name: '신규유저',
    isGet: true,
    url: badgeImg1,
    info: '반갑습니다! 회원님! 회원가입시 획득가능합니다.',
  },
  {
    type: '최초',
    name: '최초 작성',
    isGet: false,
    url: badgeImg2,
    info: '데일리 기록을 최초 작성 시 획득가능합니다.',
  },
  {
    type: '연속',
    name: '3회이상 연속 작성',
    isGet: false,
    url: badgeImg3,
    info: '데일리 기록을 3회 이상 작성 시 획득가능합니다.',
  },
  {
    type: '텀블',
    name: '텀블러 사용 3회',
    isGet: false,
    url: badgeImg4,
    info: '텀블러 태그 3회 이상 작성 시 획득 가능합니다.',
  },
  {
    type: '교통',
    name: '대중교통 이용 3회',
    isGet: false,
    url: badgeImg5,
    info: '대중교통 태그 3회 이상 작성 시 획득 가능합니다.',
  },
  {
    type: '버켓',
    name: '채식하기 3회',
    isGet: false,
    url: badgeImg6,
    info: '대중교통 태그 3회 이상 작성 시 획득 가능합니다.',
  },
  {
    type: '커뮤',
    name: '커뮤니티 포스팅 3회',
    isGet: false,
    url: badgeImg7,
    info: '커뮤니티 게시물을 3회 이상 작성 시 획득 가능합니다.',
  },
];

function getBadgeTypes(user: User): string[] {
  const { badges } = user;
  const badgeTypes = badges.map((badge) => badge.type);
  return badgeTypes;
}

function updateBadgeList(badgeTypes: string[], badgeList: BadgeInfo[]): BadgeInfo[] {
  return badgeList.map((badge) => {
    if (badgeTypes.includes(badge.type)) {
      return { ...badge, isGet: true };
    }
    return badge;
  });
}

const BadgeList = () => {
  const [badgeList, setBadgeList] = useState(initialBadgeList);
  //유저 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData: User = (await userInfo()) as User;
        const badgeTypes = getBadgeTypes(userData);
        const updatedBadges = updateBadgeList(badgeTypes, badgeList);
        setBadgeList(updatedBadges);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  return badgeList;
};

export default BadgeList;
