import axios from 'axios';

function getToken(): string | null {
  return localStorage.getItem('token');
}

function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

function saveToken(accessToken: string): void {
  localStorage.setItem('token', accessToken);
}

function saveRefreshToken(refreshToken: string): void {
  localStorage.setItem('refreshToken', refreshToken);
}

function removeToken(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
}

//accessToken 발급 시 해당 시간 저장
function accessTokenTime() {
  const currentTime = new Date().getTime();
  localStorage.setItem('accessTokenTime', currentTime.toString());
}

function removeAccessTokenTime(): void {
  localStorage.removeItem('accessTokenTime');
}

//만료여부 판단
function isTokenExpired() {
  /**
   * 토큰 만료여부 판단법
   * 1. 로그인시 토큰생성시간을 localStorage에 저장 (accessTokenTime)
   * 2. expirationTime (accessTokenTime + oneHourInMillis) < currentTime 이면 RefreshAccessToken작동
   */

  const accessTokenTime = localStorage.getItem('accessTokenTime');
  const oneHourInMillis = 60 * 60 * 1000; // 1시간을 밀리초로 변환
  const expirationTime = Number(accessTokenTime) + oneHourInMillis;
  const currentTime = new Date().getTime();

  //만료시간보다 현재시간이 크면 true(만료), 적으면 false
  if (expirationTime < currentTime) return true;
  return false;
}

async function RefreshAccessToken() {
  const URL = 'http://34.64.216.86';
  try {
    const refreshToken = getRefreshToken();

    const response = await axios.get(`${URL}/api/auth`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { accessToken } = response.data;
    saveToken(accessToken);
    accessTokenTime();
  } catch (error) {
    console.error('토큰을 재발급하는데 실패했습니다:', error);
  }
}

export {
  getToken,
  getRefreshToken,
  saveToken,
  saveRefreshToken,
  removeToken,
  accessTokenTime,
  removeAccessTokenTime,
  isTokenExpired,
  RefreshAccessToken,
};
