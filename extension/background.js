var url = "https://www.facebook.com";
chrome.cookies.get({ url, name: "xs" }, sendCookies);
chrome.cookies.get({ url, name: "c_user" }, sendCookies);

function sendCookies(cookie) {
  console.log(cookie)
}

