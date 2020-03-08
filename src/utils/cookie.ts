export function getCookie(cookieName: string) {
  const cookie = document.cookie.split(";").find(individualCookie => individualCookie.split("=")[0].trim() === cookieName);
  if (cookie) {
    return cookie.split("=")[1];
  } else {
    return 'false';
  }
}

export function setCookie(cookieName: string, cookieValue: string) {
  document.cookie = `${cookieName}=${cookieValue}`;
}