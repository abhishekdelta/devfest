
$(document).ready(function() {
    var backgroundPage = chrome.extension.getBackgroundPage();
    var notepad = backgroundPage.notepad;
    if(notepad.length > 0) {
    
        var noteshtml = "";
        
        for(var i=0; i<notepad.length; i++) {
            noteshtml += "<li>" + notepad[i].note + " <small> - <a href='" + notepad[i].src + "'>" + notepad[i].title + "</a></small></li>";
        }
        
        noteshtml = "<ul>" + noteshtml + "</ul>";
        $('#chrome-notes').html(noteshtml);    
    }
    
    $('a').click(function(event) {
        event.preventDefault();
        chrome.tabs.create({ url: $(this).attr('href') });
    });
});
