function tomarFoto(fuente)
{
    try {
        var filename = "fotoTest1.jpg";
        
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
                pictureSource: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.PNG,
                saveToPhotoAlbum: true
            });

        function onSuccess(imageData)
        {
            var image = document.getElementById('tempFoto');
            image.src =  imageData;
        }

        function onFail(message)
        {
            alert('Failed because: ' + message);
        }
    }
    catch (error)
    {
        Mensage(error);
    }
}

