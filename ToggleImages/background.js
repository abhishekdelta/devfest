var state = 0;

chrome.browserAction.setBadgeText({text: ' '});
chrome.browserAction.setBadgeBackgroundColor({color: '#CDCDCD'});

chrome.browserAction.onClicked.addListener(function(tab) {

    var msg = {action: 'toggle'};
    chrome.tabs.sendRequest(tab.id, msg, function(response) {            
          if(response.result == 1) {
            chrome.browserAction.setBadgeBackgroundColor({color: (state == 0 ? '#FF0000' : '#CDCDCD')});
            state = (state == 0 ? 1 : 0);            
          }          
    });
    
});

