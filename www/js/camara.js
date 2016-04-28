function tomarFoto(fuente, IDObject)
{
    try {        
        /*navigator.camera.getPicture(onSuccess, onFail,
            {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                correctOrientation: true,
                saveToPhotoAlbum: true
            });*/
        navigator.camera.getPicture(onSuccess, onFail,
            {
                quality: 50, allowEdit: true,
                destinationType: Camera.DestinationType.FILE_URI,
                pictureSource: fuente,
                encodingType: Camera.EncodingType.PNG,
                saveToPhotoAlbum: true
            });

        function onSuccess(imageData)
        {
            IDObject = "#" + IDObject;
            $(IDObject).attr('src', imageData)
        }

        function onFail(message)
        {
            Mensage('Failed because: ' + message);
        }
    }
    catch (error)
    {
        Mensage(error);
    }
}

