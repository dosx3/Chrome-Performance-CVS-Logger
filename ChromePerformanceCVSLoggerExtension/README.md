Chrome Performance CVS Logger (Extension)
Copyright (c) 2014 Lukas Schwoebel <lukeschwoebel@gmail.com>
==========================

Monitor Google Chrome's CPU and memory usage. Accumulates the CPU load and memory consumptions of
the browser including all plugins and tabs (excluding running extensions/apps).
Works only in combination with the corresponding app to write the data into a selected CSV file.


Installation Instructions
=========================

The extension utilises some Google Chrome APIs (http://developer.chrome.com/extensions/processes.html) for accessing and managing processes.
Unfortunately this means it can't (yet) be distributed through the Chrome Web Store - you need to install it manually.
Luckily, this is not difficult - and only takes a minute:

Download the Dev Channel version of Chrome/Chromium
http://www.chromium.org/getting-involved/dev-channel

1. Enable the experimental APIs
    1. Start Google Chrome
    2. Open up <a href="chrome://flags" target="_blank">chrome://flags</a> (copy and paste into a new tab)
    3. Search for "Experimental Extension APIs" and enable
    4. Relaunch Chrome for this to take effect (use the Relaunch button that appears at the bottom of the screen and all your open tabs will be preserved)

2. Install the extension
    1. [Download the source and unzip.
    2. Open <a href="chrome://extensions" target="_blank">chrome://extensions</a> (copy and paste into a new tab) or select Tools > Extensions from the Chrome menu
    3. Ensure the "Developer mode" box at the top of the page is ticked, and click the "Load unpacked extension.." button (see screenshot below)
    4. Browse to select the folder containing the files you've just downloaded and unzipped
    5. And you're done! Install the App and follow the further instruction.

Credits
=======

Created by Lukas Schwoebel (originally for Arizona State University EE WVSNP group)
http://www.wvsnp.org
Licence: MIT
Code at [https://github.com/andyyoung/Process-Monitor-for-Chrome](https://github.com/andyyoung/Process-Monitor-for-Chrome)
