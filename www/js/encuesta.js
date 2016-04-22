function CreateListaChequeo(idFormulario) {
    $("#SC_Grupos").empty();

    var rsGrupo = db.SELECT("q_grupo", { empresa: window.sessionStorage.UserEmpresa, formulario: idFormulario }).ORDER_BY('orden ASC');

    if (rsGrupo.length > 0) {
        $(rsGrupo).each(function (iG, eG) {
            $('<fieldset>')
                .attr({ 'data-role': 'collapsible', 'id': 'Grupo_' + eG.grupo })
                .html('<legend>' + eG.nombre + '</legend>')
                .appendTo("#SC_Grupos");

            var tempID = '#Grupo_' + eG.group

            var rsPregunta = db.SELECT("q_pregunta", { empresa: window.sessionStorage.UserEmpresa, formulario: idFormulario, grupo: eG.grupo });

            if (rsPregunta.length > 0) {
                $(rsPregunta).each(function (iP, eP) {
                    var GrupoID = '#Grupo_' + eP.grupo;
                    var PreguntaID = 'Pregunta_' + eP.grupo + "_" + eP.pregunta;
                    var IDRes = PreguntaID + "_res";
                    $('<fieldset>')
                        .attr({ 'data-role': 'controlgroup', 'data-type': 'horizontal', 'id': PreguntaID })
                        .appendTo(GrupoID);

                    PreguntaID = "#" + PreguntaID;

                    $('<legend>')
                        .attr({ 'onclick': 'Mensage("' + eP.ayuda + '")' })
                        .html(eP.nombre).appendTo(PreguntaID);

                    /*a*/
                    $('<input>')
                        .attr({ 'type': 'radio', 'name': IDRes, 'id': IDRes + '_a', 'value': 'a' })
                        .appendTo(PreguntaID);

                    $('<label>')
                        .attr({ 'for': IDRes + "_a" })
                        .html('<img src="img/CUMPLE.png" width="90" height="84" />')
                        .appendTo(PreguntaID);

                    $("#" + IDRes + '_a').checkboxradio();

                    /*b*/
                    $('<input>')
                        .attr({ 'type': 'radio', 'name': IDRes, 'id': IDRes + '_b', 'value': 'b' })
                        .appendTo(PreguntaID);

                    $('<label>')
                        .attr({ 'for': IDRes + "_b" })
                        .html('<img src="img/NOCUMPLE.png" width="90" height="84" />')
                        .appendTo(PreguntaID);

                    $("#" + IDRes + '_b').checkboxradio();

                    /*c*/
                    $('<input>')
                        .attr({ 'type': 'radio', 'name': IDRes, 'id': IDRes + '_c', 'value': 'c' })
                        .appendTo(PreguntaID);

                    $('<label>')
                        .attr({ 'for': IDRes + "_c" })
                        .html('<img src="img/NOAPLICA.png" width="90" height="84" />')
                        .appendTo(PreguntaID);

                    $("#" + IDRes + '_c').checkboxradio();


                    $(PreguntaID).controlgroup();
                });


            }

            $(tempID).collapsible();

        });
    }

    $("#SC_Grupos").collapsibleset("refresh");
}