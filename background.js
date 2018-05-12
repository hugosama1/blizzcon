console.log("hello");

function sleep(miliseconds) {
  var e = new Date().getTime() + miliseconds;
  while (new Date().getTime() <= e) {}
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log("ran");
  //code in here will run every time a user goes onto a new tab, so you can insert your scripts into every new tab
  chrome.tabs.query({ currentWindow: true }, function(arrayOfTabs) {
    var code =
      " \
      var count = 0;\
      var delay = function() {count++;\
        var buttonForBlizz = document.getElementsByClassName('BuyButton__tickets__button button')[0];\
        if( !buttonForBlizz == null && count <= 20 ) {setTimeout(function() { delay(); }, 50);return;}\
        if(buttonForBlizz.disabled)window.location.reload(); else buttonForBlizz.click();\
      };\
      delay();";
    sleep(1000);
    chrome.tabs.executeScript(arrayOfTabs[0].id, { code: code });
  });
});
