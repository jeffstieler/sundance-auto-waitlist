var parseOffsetCookie = function (offset) {
  offset = parseInt(offset);
  offset = isNaN(offset) ? 0 : offset;

  return offset;
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.cookies.get(
    {
      url: "http://ewaitlist.sundance.org/",
      name: "toff",
    },
    function (cookie) {
      sendResponse({ toff: parseOffsetCookie(cookie.value) });
    }
  );

  return true;
});
