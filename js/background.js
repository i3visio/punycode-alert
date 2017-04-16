/*
     _ _____      _     _
    (_)___ /_   _(_)___(_) ___         ___ ___  _ __ ___
    | | |_ \ \ / / / __| |/ _ \       / __/ _ \| '_ ` _ \
    | |___) \ V /| \__ \ | (_) |  _  | (_| (_) | | | | | |
    |_|____/ \_/ |_|___/_|\___/  (_)  \___\___/|_| |_| |_|

    Copyright 2016 Félix Brezo and Yaiza Rubio (i3visio, contacto@i3visio.com)

    This file is part of phishify. You can redistribute it and/or
    modify it under the terms of the GNU General Public License as published
    by the Free Software Foundation, either version 3 of the License, or (at
    your option) any later version.

    This program is distributed in the hope that it will be useful, but
    WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
    Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

/**
    Two parameters received:
        - currentUrl as provided by the browser
        - eventType as the type of event raised
*/
function doSomething(currentUrl, eventType) {
    // Variable
    var punycodeStr = "xn--";

    // Setting the text...
    chrome.browserAction.setBadgeText({"text": ""});

    // Grabbing the configuration if possible
    chrome.storage.sync.get("config", function (storage) {

        // Si matchea con la objetivo...
        if (currentUrl.indexOf(punycodeStr) > -1) {
            // Raise a Notification if this has been perfomed based on a onRequest event
            if (storage["config"]["cheAlert"] && eventType == "onRequest") {
                var textTitle = chrome.i18n.getMessage("aleNotificationTitle");
                var textBody = chrome.i18n.getMessage("aleNotificationBody");

                new Notification(textTitle, {
                  icon: '/img/logo.png',
                  body: textBody + currentUrl,
                });
            }
            // Update the badge text
            chrome.browserAction.setBadgeText({"text": storage["config"]["texBadgeText"]});
            // Set badge background color as red
            chrome.browserAction.setBadgeBackgroundColor({color: "red"});
        }
    });
}


// To change when the request is performed
chrome.extension.onRequest.addListener(function(request, sender) {
    chrome.tabs.query({active: true}, function(tabArray) {
        // Selecting the active tab...
        var currentURL = tabArray[0].url;
        doSomething(currentURL, "onRequest");
    });
});

//To change when the selection changes...
chrome.tabs.onSelectionChanged.addListener(function(tabId, props) {

    chrome.tabs.query({active: true}, function(tabArray) {
        // Selecting the active tab...
        var currentURL = tabArray[0].url;
        doSomething(currentURL, "onSelectionChange");
    });
});
