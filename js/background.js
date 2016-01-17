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

function doSomething(currentUrl) {
    // Variable
    var punycodeStr = "xn--";

    // Setting the text...
    chrome.browserAction.setBadgeText({"text": ""});

    // Grabbing the configuration if possible
    chrome.storage.sync.get("config", function (storage) {
        // Si matchea con la objetivo... 
        if (currentUrl.indexOf(punycodeStr) > -1) {
            if (storage["config"]["cheAlert"]) {
                //alert(chrome.i18n.getMessage("alertWarning") + currentURL);
                alert("BE CAREFUL! Is this URL where you want to go?\n\nIt has some Punycode content, so surf carefully:\n" + currentUrl);
            }
            // Mostrando el cambio en un texto
            chrome.browserAction.setBadgeText({"text": storage["config"]["texBadgeText"]});
        }
    });
}


// To change when the request is performed
chrome.extension.onRequest.addListener(function(request, sender) {
    chrome.tabs.query({active: true}, function(tabArray) {
        // Selecting the active tab...
        var currentURL = tabArray[0].url;
        doSomething(currentURL);
    });
});

//To change when the selection changes...
chrome.tabs.onSelectionChanged.addListener(function(tabId, props) {

    chrome.tabs.query({active: true}, function(tabArray) {
        // Selecting the active tab...
        var currentURL = tabArray[0].url;
        doSomething(currentURL);
    });
});
