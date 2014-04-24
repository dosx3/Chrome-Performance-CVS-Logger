Chrome Performance CVS Logger
=============================
Copyright (c) 2014 Lukas Schwoebel <lukeschwoebel@gmail.com>

Project containing an Extension and App that work together in the logging process:
* The extension captures/monitors the CPU load/memory consumption of all processes
* The app writes the results into a selected CSV files (and therefore, implicitly starts and stops the logging process)

Installation Instructions
=========================

Follow the instruction of the Extension to download the Dev channel's Chrome version and
activate experimental API flags.

1. Install the app and extension
    1. [Download the source and unzip.
    2. Open <a href="chrome://extensions" target="_blank">chrome://extensions</a> (copy and paste into a new tab) or select Tools > Extensions from the Chrome menu
    3. Ensure the "Developer mode" box at the top of the page is ticked, and click the "Load unpacked extension.." button
    4. Browse to select the folder containing the files you've just downloaded and unzipped
	5. Select the "ChromePerformanceCVSLoggerExtension" folder to install the extension
	6. Select the "ChromePerformanceCVSLoggerApp" folder to install the app
    7. And you're done! Now start the logging process by clicking "launch" at the app-item and then selecting a file in the popup.

Credits
=======

Created by Lukas Schwoebel (originally for Arizona State University EE WVSNP group)
http://www.wvsnp.org
Licence: MIT
