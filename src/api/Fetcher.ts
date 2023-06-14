import * as Api from './apiRequest';

const domain = `http://34.64.216.86/api`;

// 로그인
export async function userLogin(userId: string, password: string) {
  const data = {
    id: userId,
    password: password,
  };
  return await Api.post(domain, 'auth', data, false);
}

export async function getCommunityPosts(number?: string) {
  const params = number ? `community/questions?page=${number}?sort=latest` : `community/questions?page=1?sort=latest`;
  return await Api.get(domain, params, false);
}

//회원가입
export async function userJoin(userId: string, password: string, name: string, email: string, phone: string) {
  const data = {
    id: userId,
    password: password,
    name: name,
    email: email,
    phoneNumber: phone,
  };
  return await Api.post(domain, 'user/register', data);
}

//아이디찾기
export async function FindId(email: string, name: string) {
  const data = {
    email: email,
    name: name,
  };
  return await Api.post(domain, 'user/loginid', data);
}

//비밀번호 찾기
export async function FindPassword(email: string) {
  const data = {
    email: email,
  };
  return await Api.post(domain, 'user/reset', data);
}

//비밀번호 변경
export async function ChangePassword(currentPassword: string, newPassword: string) {
  const data = {
    currentPassword: currentPassword,
    newPassword: newPassword,
  };
  return await Api.post(domain, 'user/change', data);
}

// 유저 정보 획득
export async function userInfo() {
  return await Api.get(domain, 'user');
}

// 로그아웃
export async function userLogout() {
  return await Api.get(domain, 'auth/logout');
}

// 유저 정보 변경
export async function userInfoChange(userId: string, userName: string, userEmail: string, userPhoneNumber: string) {
  const data = {
    id: userId,
    name: userName,
    email: userEmail,
    phoneNumber: userPhoneNumber,
  };
  return await Api.patch(domain, 'user', data);
}

// 대표 뱃지 변경
export async function checkedBadgeChange(checkedBadge: string) {
  const data = {
    checkedBadge: checkedBadge,
  };
  return await Api.patch(domain, 'user', data);
}

// 비밀번호 확인
export async function checkPassword(password: string) {
  const data = {
    password: password,
  };
  return await Api.post(domain, 'user/check', data);
}

// 유저 프로필 이지미 변경
export async function userImgChange(profileImg: FormData) {
  const data = {
    profileImg: profileImg,
  };
  return await Api.post(domain, 'user/profile', data);
}
