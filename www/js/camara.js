function tomarFoto(fuente)
{
    try {
        var filename = "fotoTest1.jpg";
        
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            correctOrientation: true,
            saveToPhotoAlbum: true
        });

        function onSuccess(imageData) {
            var image = document.getElementById('tempFoto');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
    catch (error)
    {
        Mensage(error);
    }
}

