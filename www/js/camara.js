function tomarFoto(fuente)
{
    cameraOptions =
        {
            quality: 50,
            destinationType: 0,
            sourceType: fuente,
            allowEdit: true,
            encodingType: 0,
            targetWidth: 100,
            targetHeight: 100,
            correctOrientation: true,
            popoverOptions: true,
            saveToPhotoAlbum: false
        };

    navigator.camera.getPicture(function (srcIMG)
    {
        $("#ImgTempDisplay").attr("scr", "data:image/jpeg;base64," + srcIMG);
    },
    function (msg)
    {
        Mensage(msg);
    }, cameraOptions);
}