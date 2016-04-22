function tomarFoto(fuente)
{
    try {
        navigator.customCamera.getPicture(filename, function success(fileUri) {
            alert("File location: " + fileUri);
        }, function failure(error) {
            alert(error);
        }, {
            quality: 80,
            targetWidth: 120,
            targetHeight: 120
        });
    }
    catch (error)
    {
        Mensage(error);
    }
}

