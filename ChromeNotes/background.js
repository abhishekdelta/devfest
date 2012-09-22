var notepad = new Array();

chrome.contextMenus.create({"type": "normal", 
                            "title": "Copy to ChromeNote",
							"contexts": ["selection"], 
							"onclick": addToChromeNote
});

chrome.browserAction.setBadgeText({text:'0'});
chrome.browserAction.setBadgeBackgroundColor({color:'#0000FF'});

function addToChromeNote(data, tab) {
   
    notepad.push({
        note: data.selectionText,
        src: data.pageUrl,
        title: tab.title        
    }); 
    
    
    /// Increment the badge counter
    chrome.browserAction.getBadgeText({}, function(badgeText) { 
        var count = Number(badgeText) + 1;
        chrome.browserAction.setBadgeText({
            text:String(count)
        });
    });
}

