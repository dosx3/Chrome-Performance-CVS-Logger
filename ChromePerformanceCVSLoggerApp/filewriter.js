/**
 * references:
 * https://developer.chrome.com/apps/first_app
 * https://developer.chrome.com/apps/fileSystem
 * https://developer.chrome.com/apps/app_storage
 * http://www.html5rocks.com/en/tutorials/file/filesystem/
 * https://developer.chrome.com/extensions/messaging
 * http://www.developer.com/lang/reading-and-writing-files-in-chrome-installed-applications.html
 */

var logging_file = -1;	// the file that is to be written into
						// will contain a string/id that can be used by chrome.fileSystem.restoreEntry
var lock = false;		// make sure no two filechoosers are open(ed) at the same time, so use a lock
var measure_data_name = 'performancemeasure.csv';
var done_init = false;


window.addEventListener('load', function () {
	// add event listener to "chooseFile" button
	document.getElementById('chooseFile').
			addEventListener('click',
				chooseFileEntry);
});
	
/** chooseFileEntry
 * @brief let user select a file in local filesystem to write logging data into
 */
function chooseFileEntry() {
	// TODO: possibility to restart session?
	if(!logging_file || logging_file == -1) {
	
		if(!lock) {
			lock = true;
	
			// TODO: make sure or notify user to choose a NEW or EMPTY file?
			// or include check in order to not write the CSV file header?
			chrome.fileSystem.chooseEntry({type: 'saveFile', suggestedName: measure_data_name}, function(chosenLoggingFile) {

				lock = false;
				if(!chosenLoggingFile) {
					// TODO: inform user?
					console.log('Still No File Selected!');
					return;
				}
				
				// save the id of this entry for later usage
				logging_file = chrome.fileSystem.retainEntry(chosenLoggingFile);
				
				// write CSV header into file
				chosenLoggingFile.createWriter(function (fileWriter) {

					fileWriter.onwriteend = function (e) {
						console.log('Write completed.');
						done_init = true;
					};

					fileWriter.onerror = function (e) {
						console.log('Write failed: ' + e.toString());
					};

					// create a blob with the file-header in plain-text and write to logging-file
					var blob = new Blob(['Time,CPU,Memory' + "\n\n"], {type: 'text/plain'});
					fileWriter.write(blob);
								
				}, error_handler); // end createWriter
			}); // end chooseEntry
		}
	}
}

/** chrome app message listener
 * @brief listens for messages sent from other apps/extensions
 *
 * will put the message-text (from the app's extension) into a CSV file to logg it
 * the text hopefully contains a (single) pre-formatted CSV data set
 */
chrome.runtime.onMessageExternal.addListener(
	function(request, sender, sendResponse) {
	
		// on getting messages (presumably from extension?!),
		// check 
		if(done_init) {
		
			// Create a FileWriter object for our FileEntry (log.txt).
			chrome.fileSystem.restoreEntry(logging_file, function(fileEntry) {
				fileEntry.createWriter(function (fileWriter) {

					fileWriter.onwriteend = function (e) {
						console.log('Write completed.');
					};

					fileWriter.onerror = function (e) {
						console.log('Write failed: ' + e.toString());
					};

					// Start write position at EOF to append new data
					fileWriter.seek(fileWriter.length);
					
					// put the sent data into a blob and write it to the file
					// we assume here, that the extension put the right data inside {request: writeRequestString} already
					var blob = new Blob([request.writeRequestString + "\n"], {type: 'text/plain'});
					fileWriter.write(blob);
							
				}, error_handler); // end createWriter
			});
		}
	}
);


var error_handler = function (e) {
    var msg = '';

    switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
    case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
    case FileError.SECURITY_ERR:
        msg = 'SECURITY_ERR';
        break;
    case FileError.INVALID_MODIFICATION_ERR:
        msg = 'INVALID_MODIFICATION_ERR';
        break;
    case FileError.INVALID_STATE_ERR:
        msg = 'INVALID_STATE_ERR';
        break;
    default:
        msg = 'Unknown Error';
        break;
    };

    console.log('Error: ' + msg);
};