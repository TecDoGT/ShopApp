FillComboQuery("pais", function (row) {
    return true;
}, ["pais", "nombre"], window.sessionStorage.getItem("UserPais"));