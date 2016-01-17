/*
     _ _____      _     _
    (_)___ /_   _(_)___(_) ___         ___ ___  _ __ ___
    | | |_ \ \ / / / __| |/ _ \       / __/ _ \| '_ ` _ \
    | |___) \ V /| \__ \ | (_) |  _  | (_| (_) | | | | | |
    |_|____/ \_/ |_|___/_|\___/  (_)  \___\___/|_| |_| |_|

    Copyright 2016 Félix Brezo and Yaiza Rubio (i3visio, contacto@i3visio.com)

    This file is part of Web Surfer Assistant. You can redistribute it and/or
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

/*
    The configuration file is a Json with the following structure:
        {
            "cheAlert" : false,
            "texBadgeText": "!!!"
        }
*/

function saveConfiguration() {
    //console.log("options.js: Save configuration");

    // Get a value saved in a form.
    var dictConfig = {};
    dictConfig["texBadgeText"] = "";
    dictConfig["cheAlert"] = false;

    // Setting up the profiles
    dictConfig["texBadgeText"] = document.getElementById('texBadgeText').value;
    dictConfig["cheAlert"] = document.getElementById('cheAlert').checked;

    var textConfig = JSON.stringify(dictConfig, null, 4);

    //console.log("options.js: " + textConfig);

    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({'config': dictConfig}, function() {
        // Notify that we saved.
        //console.log("New settings saved");
        // Showing warning message
        //alert(chrome.i18n.getMessage(aleConfigurationSaved));
        alert("New configuration saved as:\n\n"+textConfig);
    });

    //console.log("Sending reload message...");
    // Sending message of task completed to let the scripts reload the information
    chrome.runtime.sendMessage({done: true});

    return true;
}

/*
    Grabbing the configuration and seting it into the UI.
        {
            "cheAlert" : true,
            "texBadgeText": "Puny"
        }
*/
document.addEventListener('DOMContentLoaded', function () {
    //console.log("Grabbing the current configuration...");

    // Grabbing the configuration if possible
    chrome.storage.sync.get("config", function (storage) {
        var dictConfig = {};

        dictConfig = storage["config"];
        var textConfig = JSON.stringify(dictConfig, null, 4);

        // Raising an exception!
        if (typeof(dictConfig) == "undefined") {
            // No information was stored so... We'll load the default configuration manually:
            // Get a value saved in a form.

            var dictConfig = {};

            dictConfig["texBadgeText"] = "Puny";
            dictConfig["cheAlert"] = true;

            var textConfig = JSON.stringify(dictConfig, null, 4);

            //console.log("options.js: " + textConfig);

            // Save it using the Chrome extension storage API.
            chrome.storage.sync.set({'config': dictConfig}, function() {
                // Notify that we saved.
                //console.log("Default settings saved.");

                //console.log("Sending reload message...");
                // Sending message of task completed to let the scripts reload the information
                chrome.runtime.sendMessage({done: true});


                // Inserting the elements into the UI
                var element = document.getElementById('cheAlert');
                element.checked = dictConfig["cheAlert"];

                var element = document.getElementById('texBadgeText');
                element.value = dictConfig["texBadgeText"];
           });
        } else {
            // Inserting the elements into the UI
            var element = document.getElementById('cheAlert');
            element.checked = dictConfig["cheAlert"];

            var element = document.getElementById('texBadgeText');
            element.value = dictConfig["texBadgeText"];
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('butSave').addEventListener('click', saveConfiguration);
});
