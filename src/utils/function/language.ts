export function getPreferedLanguage() {
  if (typeof window !== "undefined") {
    const cookiesSplit = window.document.cookie.split("; ");
    const cookies: any = {};

    cookiesSplit.forEach((cookie) => {
      const array = cookie.split("=");
      const key = array[0];
      const value = array[1];
      cookies[key] = value;
    });
    return cookies.language;
  }
}
