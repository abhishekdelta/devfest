
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

    /// Make sure we are recieving message from the extension only. Background.js won't have a particular tab so its id is -1
    if(sender.tab.id != -1) return;

    if (request.action == "toggle") {
      $('img').toggle();
      sendResponse({result: 1});
    }
      
});
