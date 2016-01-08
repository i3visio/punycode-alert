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

// To change when the request is performed
chrome.extension.onRequest.addListener(function(request, sender) {
    chrome.tabs.query({active: true}, function(tabArray) {
        chrome.browserAction.setBadgeText({"text": ""});
        var punycodeStr = "xn--";
        // Cogemos la URL de la pestaña activa
        var currentURL = tabArray[0].url;

        // Si matchea con la objetivo... 
        if (currentURL.indexOf(punycodeStr) > -1) {
            alert(chrome.i18n.getMessage("alertWarning") + currentURL);
            // Mostrando el cambio en un texto
            chrome.browserAction.setBadgeText({"text": "Puny"});
        }
    });
});

//To change when the selection changes...
chrome.tabs.onSelectionChanged.addListener(function(tabId, props) {

    chrome.tabs.query({active: true}, function(tabArray) {
        chrome.browserAction.setBadgeText({"text": ""});
        var punycodeStr = "xn--";
        // Cogemos la URL de la pestaña activa
        var currentURL = tabArray[0].url;

        // Si matchea con la objetivo... 
        if (currentURL.indexOf(punycodeStr) > -1) {
            alert(chrome.i18n.getMessage("alertWarning") + currentURL);
            // Mostrando el cambio en un texto
            chrome.browserAction.setBadgeText({"text": "Puny"});
        }
    });
});

