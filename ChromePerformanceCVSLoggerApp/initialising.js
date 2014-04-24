/**
 * references:
 * https://developer.chrome.com/apps/first_app
 * https://developer.chrome.com/apps/fileSystem
 * https://developer.chrome.com/apps/app_storage
 * http://www.html5rocks.com/en/tutorials/file/filesystem/
 * https://developer.chrome.com/extensions/messaging
 */

var done_init = false;
 
chrome.app.runtime.onLaunched.addListener(init);

function init() {
    if (done_init) {
        return;
    }
	
	// start the main window to start measurements
	chrome.app.window.create('filechooser.html', {
		bounds: {width: 500, height: 170},
		id: "ChromePerformanceCVSWriterAppWindow"}
	);
	
	done_init = true;
}