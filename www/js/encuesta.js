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
                        .attr({ 'type': 'radio', 'name': IDRes, 'id': IDRes + '_a', 'value': '1' })
                        .appendTo(PreguntaID);

                    $('<label>')
                        .attr({ 'for': IDRes + "_a" })
                        .html('<img src="img/CUMPLE.png" width="90" height="84" />')
                        .appendTo(PreguntaID);

                    $("#" + IDRes + '_a').checkboxradio();

                    /*b*/
                    $('<input>')
                        .attr({ 'type': 'radio', 'name': IDRes, 'id': IDRes + '_b', 'value': '2' })
                        .appendTo(PreguntaID);

                    $('<label>')
                        .attr({ 'for': IDRes + "_b" })
                        .html('<img src="img/NOCUMPLE.png" width="90" height="84" />')
                        .appendTo(PreguntaID);

                    $("#" + IDRes + '_b').checkboxradio();

                    /*c*/
                    $('<input>')
                        .attr({ 'type': 'radio', 'name': IDRes, 'id': IDRes + '_c', 'value': '3' })
                        .appendTo(PreguntaID);

                    $('<label>')
                        .attr({ 'for': IDRes + "_c" })
                        .html('<img src="img/NOAPLICA.png" width="90" height="84" />')
                        .appendTo(PreguntaID);

                    $("#" + IDRes + '_c').checkboxradio();
                    
                    //Form de accion correctiva
                    //inicio
                    $('<fieldset>')
                        .attr({ 'data-role': 'controlgroup', 'id': IDRes + '_noAplicaForm' })
                        .appendTo(GrupoID);
                    $('<div>').attr({ 'class': 'formNoAplica', 'id': IDRes + '_noAplicaForm_2' }).appendTo("#" + IDRes + '_noAplicaForm');

                    $('<div>').attr({ 'class': 'ui-field-contain', 'id': IDRes + '_noAplicaForm_1' }).appendTo("#" + IDRes + '_noAplicaForm_2');
                    
                    $('<label>')
                        .html('Fecha de Plazo:')
                        .appendTo("#" + IDRes + '_noAplicaForm_1');

                    $('<input>')
                        .attr({ 'type': 'date', 'data-clear-btn': 'true', 'name': 'q_respuesta_accion_fecha_' + IDRes, 'id': 'q_respuesta_accion_fecha_' + IDRes })
                        .appendTo("#" + IDRes + '_noAplicaForm_1');

                    
                    $('#q_respuesta_accion_fecha_' + IDRes).textinput();
                    //%cumple
                    $('<label>')
                        .attr({ 'for': 'q_respuesta_pct_cumplimiento_' + IDRes })
                        .html('% de Cumplimiento:')
                        .appendTo("#" + IDRes + '_noAplicaForm_1');
                    $('<input>')
                       .attr({ 'type': 'number', 'id': 'q_respuesta_pct_cumplimiento_' + IDRes, 'name': 'q_respuesta_pct_cumplimiento_' + IDRes })
                       .appendTo("#" + IDRes + '_noAplicaForm_1');
                    $('#q_respuesta_pct_cumplimiento_' + IDRes).textinput();

                    //AccionCorectivca
                    $('<label>')
                        .attr({ 'for': 'q_respuesta_accion_correctiva_' + IDRes })
                        .html('Accion Correctiva:')
                        .appendTo("#" + IDRes + '_noAplicaForm_1');
                    $('<input>')
                       .attr({ 'type': 'text', 'id': 'q_respuesta_accion_correctiva_' + IDRes, 'name': 'q_respuesta_accion_correctiva_' + IDRes })
                       .appendTo("#" + IDRes + '_noAplicaForm_1');
                    $('#q_respuesta_accion_correctiva_' + IDRes).textinput();

                    //responsable
                    $('<label>')
                        .attr({ 'for': 'q_respuesta_accion_responsable_' + IDRes })
                        .html('Responsable: ')
                        .appendTo("#" + IDRes + '_noAplicaForm_1');
                    $('<input>')
                       .attr({ 'type': 'text', 'id': 'q_respuesta_accion_responsable_' + IDRes, 'name': 'q_respuesta_accion_responsable_' + IDRes })
                       .appendTo("#" + IDRes + '_noAplicaForm_1');
                    $('#q_respuesta_accion_responsable_' + IDRes).textinput();

                    //Indicador
                    $('<label>')
                        .attr({ 'for': 'q_respuesta_accion_indicador_' + IDRes })
                        .html('Indicador:')
                        .appendTo("#" + IDRes + '_noAplicaForm_1');
                    $('<input>')
                       .attr({ 'type': 'text', 'id': 'q_respuesta_accion_indicador_' + IDRes, 'name': 'q_respuesta_accion_indicador_' + IDRes })
                       .appendTo("#" + IDRes + '_noAplicaForm_1');
                    $('#q_respuesta_accion_indicador_' + IDRes).textinput();

                    
                    
                    

                    $('<input>')
                        .attr({ 'id': 'BTN_tomarFoto_' + IDRes, 'data-role': 'button', 'type': 'button', 'value': 'Foto' })
                        .appendTo("#" + IDRes + '_noAplicaForm_2');

                    $('#BTN_tomarFoto_' + IDRes).button();

                    $("#" + IDRes + '_noAplicaForm').controlgroup();
                    //fin
                    $("#" + IDRes + '_noAplicaForm').hide();
                    // Eveto para desplegar Accion Correctiva
                    var StrSelector = 'input:radio[name="' + IDRes + '"]';

                    $(StrSelector).change(function ()
                    {
                        if ($(this).is(':checked') && $(this).val() == "2")
                            $("#" + IDRes + '_noAplicaForm').show();
                        else
                            $("#" + IDRes + '_noAplicaForm').hide();
                    });

                    $(PreguntaID).controlgroup();
                });


            }

            $(tempID).collapsible();

        });
    }

    $("#SC_Grupos").collapsibleset();
}



$(document).on("pagecreate", "#DLGEncuesta", function ()
{
    RemoveSessionVar();

    $("#DLGEncuesta").bind("pagehide", function ()
    {
        RemoveSessionVar();
    });

    window.sessionStorage.setItem("#FromMode", "I");
    window.sessionStorage.setItem("#TableName", "q_encuesta");
    window.sessionStorage.setItem("#RowID", 0);

    var rs = db.SELECT("q_formulario", { empresa: window.sessionStorage.UserEmpresa });

    if (rs.length > 0)
    {
        $("<option>").attr({ 'value': 'Empty' }).html($("label[for='Q_ENCUESTA_FORMULARIO']").text()).appendTo("#Q_ENCUESTA_FORMULARIO");
        $(rs).each(function (i, e)
        {
            $('<option>')
                .attr({ 'value': e.formulario })
                .html(e.nombre)
                .appendTo("#Q_ENCUESTA_FORMULARIO");
        });

        $("#Q_ENCUESTA_FORMULARIO").selectmenu("refresh");
    }

    var rsP = db.SELECT("vc_productor", { empresa: window.sessionStorage.UserEmpresa });

    if (rsP.length > 0)
    {
        $("<option>").attr({ 'value': 'Empty' }).html($("label[for='Q_ENCUESTA_PRODUCTOR']").text()).appendTo("#Q_ENCUESTA_PRODUCTOR");
        $(rsP).each(function (i, e)
        {
            $('<option>')
                .attr({ 'value': e.productor })
                .html(e.nombre)
                .appendTo("#Q_ENCUESTA_PRODUCTOR");
        });

        $("#Q_ENCUESTA_PRODUCTOR").selectmenu("refresh");
    }

    var rsC = db.SELECT("cosecha").ORDER_BY("cosecha DESC");

    if (rsC.length > 0)
    {
        $("<option>").attr({ 'value': 'Empty' }).html($("label[for='Q_ENCUESTA_COSECHA']").text()).appendTo("#Q_ENCUESTA_COSECHA");
        $(rsC).each(function (i, e)
        {
            $('<option>')
                .attr({ 'value': e.cosecha })
                .html(e.cosecha)
                .appendTo("#Q_ENCUESTA_COSECHA");
        });

        $("#Q_ENCUESTA_COSECHA").selectmenu("refresh");
    }

    $("#Q_ENCUESTA_COSECHA").change(function ()
    {
        window.sessionStorage.setItem("#q_encuesta_cosecha$", $(this).val());
    });

    $("#Q_ENCUESTA_PRODUCTOR").change(function () {
        window.sessionStorage.setItem("#P_q_encuesta_productor$", $(this).val());

        $("#Q_ENCUESTA_FINCA").empty();

        window.sessionStorage.removeItem("#P_q_encuesta_encuesta$");

        $("#Q_ENCUESTA_ENCUESTA").val('');

        var rs = db.SELECT("vc_finca", { empresa: window.sessionStorage.UserEmpresa, productor: window.sessionStorage.getItem("#P_q_encuesta_productor$") });

        if (rs.length > 0) {
            $("<option>").attr({ 'value': 'Empty' }).html($("label[for='Q_ENCUESTA_FINCA']").text()).appendTo("#Q_ENCUESTA_FINCA");
            $(rs).each(function (i, e) {
                $('<option>')
                    .attr({ 'value': e.finca })
                    .html(e.nombre)
                    .appendTo("#Q_ENCUESTA_FINCA");
            });
        }

        $("#Q_ENCUESTA_FINCA").selectmenu("refresh");
    });

    $("#Q_ENCUESTA_NOTA").change(function ()
    {
        window.sessionStorage.setItem("#q_encuesta_nota$", $(this).val());
    });

    $("#Q_ENCUESTA_FINCA").change(function ()
    {
        window.sessionStorage.setItem("#P_q_encuesta_finca$", $(this).val());

        var maxReg = db.SELECT("q_encuesta",
            function (row)
            {
                return row.empresa == window.sessionStorage.UserEmpresa
                && row.productor == window.sessionStorage.getItem("#P_q_encuesta_productor$")
                && row.finca == window.sessionStorage.getItem("#P_q_encuesta_finca$")
                && row.formulario == window.sessionStorage.getItem("#P_q_encuesta_formulario$")
            })
            .MAX("encuesta");

        maxReg = maxReg == null ? 1 : (maxReg * 1) + 1;

        $("#Q_ENCUESTA_ENCUESTA").val(maxReg);

        window.sessionStorage.setItem("#P_q_encuesta_encuesta$", maxReg);
    });

    $("#Q_ENCUESTA_FORMULARIO").change(function ()
    {
        window.sessionStorage.setItem("#P_q_encuesta_formulario$", $(this).val());
    });

    window.sessionStorage.setItem("#q_encuesta_usuario$", window.sessionStorage.UserLogin);
    window.sessionStorage.setItem("#q_encuesta_promotor$", window.sessionStorage.UserPromotor);
    
});