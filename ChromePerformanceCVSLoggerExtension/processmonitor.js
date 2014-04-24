/**
 * references:
 * https://developer.chrome.com/extensions/processes.html
 * https://developer.chrome.com/extensions/messaging
 */


var done_init = false;
var logger_app_port = -1;

function init() {
    if (done_init) {
        return;
    }
    chrome.processes.onUpdatedWithMemory.addListener(receiveProcessInfo);
    done_init = true;
}

function receiveProcessInfo(processes) {

	if(done_init) {

		var totalCPU = 0;
		var totalMemory = 0;
		// go through all processes in Chrome and accumulate all values
		for (pid in processes) {
		
			// do not track "extensions" here
			// they should be disabled during testing anyways, but as this tracking tool
			// is an extension (including the "App"), this would distort the measurement
			// so only track the browser, gpu, tabs, and "plugins" like Flash
			if(processes[pid].type != "extension") {
				totalCPU += processes[pid].cpu;
				totalMemory += processes[pid].privateMemory;
			}
		}

		// convert memory to KB
		totalMemory = (totalMemory / 1024).toFixed(0);
		
		// now send current formatted CSV data set to the App
		// as only Apps can access the local filesystem, we need to perform the file-writing in an Google Chrome "App"
		// so just use the messaging
		chrome.runtime.sendMessage('kabeddcknclceepppjeonlnfllgfnpof', {writeRequestString: Date.now() + ',' + totalCPU + ',' + totalMemory});
	}
}

document.addEventListener('DOMContentLoaded', init);