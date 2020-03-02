import { reloadAuthorized } from './Authorized';
let token = null;
// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-kzabc-authority') : str;

  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }

  return authority;
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-kzabc-authority', JSON.stringify(proAuthority));
  // auto reload
  reloadAuthorized();
}

export function getToken() {
  if (token === null) {
    token = (localStorage.getItem('token') || '||').split('|');
  }
  return token;
}

export function setToken(accessToken = '', tokenType = '', expiresIn = '') {
  token = [accessToken, tokenType, expiresIn];
  return localStorage.setItem('token', token.join('|'));
}
export function getAuthorization() {
  getToken();
  return [token[1], token[0]].filter(_ => _).join(' ');
}

