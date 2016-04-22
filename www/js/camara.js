function tomarFoto(fuente)
{
    try {
        var captureSuccess = function (mediaFiles) {
            var i, path, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                path = mediaFiles[i].fullPath;
                // do something interesting with the file
            }
        };

        // capture error callback
        var captureError = function (error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        // start image capture
        navigator.device.capture.captureImage(captureSuccess, captureError, { limit: 2 });
    }
    catch (error)
    {
        Mensage(error);
    }
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    Mensage(navigator.camera);
}