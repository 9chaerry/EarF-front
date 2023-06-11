import Home from 'pages/Home';
import MyPage from 'pages/MyPage';
import MyCommunity from 'pages/MyCommunity';
import MyPageEdit from 'pages/MyPageEdit';
import Community from 'pages/Community';
import CommunityPosting from 'pages/CommunityPosting';
import Boast from 'pages/Boast';
import Calender from 'components/Calender';
import Login from 'pages/Login';
import Join from 'pages/Join';
import FindId from 'pages/FindId';
import FindPassword from 'pages/FindPassword';
import ChangePassword from 'pages/ChangePassword';
import MyBadge from 'pages/MyBadge';
import CommunityPost from 'pages/CommunityPost';

export const protectedRoutes = [
  {
    path: '/community/post',
    element: <CommunityPosting />,
  },
  {
    path: '/mypage/info',
    element: <MyPage />,
  },
];
export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/community',
    element: <Community />,
  },
  {
    path: '/community/boast',
    element: <Boast />,
  },
  {
    path: '/community/question',
    element: <CommunityPost />,
  },
  {
    path: '/mypage/edit',
    element: <MyPageEdit />,
  },
  {
    path: '/mypage/mycommunity',
    element: <MyCommunity />,
  },
  {
    path: '/mypage/badge',
    element: <MyBadge />,
  },
  {
    path: '/calender',
    element: <Calender />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/join',
    element: <Join />,
  },
  {
    path: '/find_id',
    element: <FindId />,
  },
  {
    path: '/find_password',
    element: <FindPassword />,
  },
  {
    path: '/change_password',
    element: <ChangePassword />,
  },
];
