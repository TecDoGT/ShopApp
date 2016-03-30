var db;
var uriServer = "http://200.30.150.165:8080/webservidor2/mediador.php";
//window.screen.unlockOrientation();
$(document).ready(function(e) 
{
	
	if (window.localStorage.getItem("LocalStorageDB-KannelMovil-::tables::") == undefined)
	{
		CreateDB("KannelMovil");
	}
	else
	{
		db = new LocalStorageDB("KannelMovil");
	}
	
	$("#loadingAJAX").width(window.innerWidth);
	$("#loadingAJAX").height(window.innerHeight);
	 
	$("#ajaxgif").css(
	{ 
		top: ((window.innerHeight / 2) - 80),
		left: ((window.innerWidth / 2) - 40) 
	});
		
	$("#btnTraslate").click(function (event)
	{
		$("#tInicio")._t("Example 3");
		$("#btnTraslate")._t("English");
	});
	
	var listaOb = ["#Texto1", "#tErrorLogin", "#tLogIn", "#tNoInternet", "#lLoading", "#lNoData", "#msgDropDB"];
		
	$("#loadingAJAX").hide();
	 
	$.each(listaOb, function (index, val )
	{
		$(val).hide();
	});  
});

function Mensage(texto) {
    /*$("#loadingAJAX").show();
	$("#ajaxgif").hide();*/
    new Messi(texto,
	{
	    title: 'Kannel Mobil',
	    width: (window.innerWidth - 25),
	    callback: function (val) {
	        alert(val);
	        $("#loadingAJAX").hide();
	        $("#ajaxgif").show();
	    }
	});
}

function CreateDB(name)
{
	db = new LocalStorageDB(name);
	
		db.CREATE ("def_tables_movil", 
		{
			id: 0,
			id_obj: '', 
			project_id: 0,
			object_id: 0, 
			label: '',
			sql_colname: '',
			sql_datatype: '',
			content_type: '',
			case_sensitive: '',
			initial_value: '',
		    label_eng: '',
			list_labels: '',
			list_values: '',
			sql_colnum: 0,
			sql_pk: '',
		    data_source_movil: ''
		});
		
		db.CREATE("Object_Movil",
		{
			id: 0,
			project_id: 0,
			object_id: 0,
			movil_proj: 0,
			movil_obj: 0,
			tableName: '',
			formName: ''
		});
		
		db.CREATE("Object_Det_Movil",
		{
			id: 0,
			project_id: 0,
			object_id: 0,
			content_id: 0,
			movil_proj: 0,
			movil_obj: 0,
			movil_name: '',
			movil_help: ''
		});
			
		db.CREATE("movil_User", 
		{
			id: 0,
			userName: '',
			passWord: '',
			userPais: '',
			Empresa: ''
		});
		
 		db.CREATE ("ListMod", {id: 0, tablaName: '', neadForm: 0, formTitle: '', sinc: 0, project_id: 0, object_id: 0, padre: 0});
}

function DownLoadDataSave(Project_Id, Object_Id, strWhere, TableName, Forma, PageTitle)
{
	var rs = db.SELECT("ListMod", function (row)
			{
				return row.tablaName == TableName
			});
	
	TableName = TableName.toLowerCase();
	
	if (rs.length == 0)
	{
		$("#loadingAJAX").show();	
		
		if (window.localStorage.getItem("LocalStorageDB-KannelMovil-" + TableName) == undefined)
		{
			$.post("http://200.30.150.165:8080/webservidor2/mediador.php",
			{
				"cmd"		: "xmlDef",
				"Project"	: Project_Id,
				"Object"	: Object_Id,
				"Where"		: ""
			},
			function (data)
			{
				var $xml = $(data);
				
				var defData = '{ "id": 0, "fuente": 0, "sinc": 0, "modifica": 0, ';
				var DataInsert = "[";
				$xml.find("ROW").each(function(index, element) 
				{
					var $SData = $(this);
					
					switch ($SData.find("SQL_DATATYPE").text())
					{
						case "IN":
						case "DE":
							var temp = $SData.find("ID").text() + "";
							temp = temp.toLowerCase();
							temp = temp.replace(TableName + "_", "");
							defData += ' "' + temp.toLowerCase() + '": 0, ';
							break;
						default:
							var temp = $SData.find("ID").text() + "";
							temp = temp.toLowerCase();
							temp = temp.replace(TableName + "_", "");
							defData += ' "' + temp.toLowerCase() + '": "", ';
							break;
					}
					
					DataInsert += ' ,{ "project_id": ' + Project_Id + ", ";
					$SData.children().each(function ()
					{
						var $subData = $(this);
						var temp = $subData[0].nodeName + "";
						temp = temp.toLowerCase();
						
						temp += (temp == "id")?"_obj":"";
						
						DataInsert += ' "' + temp + '": "' + $subData.text() + '", ' ;
					});
					
					DataInsert += "}";
						
					DataInsert = DataInsert.replace(", }", "}");
				});
				
				DataInsert += "]";
				DataInsert = DataInsert.replace("[ ,{", "[{");
				objDataInsert = JSON.parse(DataInsert);
				
				if (Forma == 1)
					db.INSERT_INTO("def_tables_movil", objDataInsert);
				
				defData += "}";
				defData = defData.replace(", }", "}");
				
				objdefData = JSON.parse(defData);
			
				db.CREATE(TableName, objdefData);
				
				$("#loadingAJAX").hide();
				
				$("#loadingAJAX").show();
				$.get("http://200.30.150.165:8080/webservidor2/mediador.php", 
				{
					"cmd"		: "xmlData",
					"Project"	: Project_Id,
					"Object"	: Object_Id,
					"Where"		: strWhere
				},
				function (data)
				{
					$("#loadingAJAX").show();
					$("#dMessageBDDone").hide();
					var $xml = $(data);
								
					var DataInsert = "[";
					$xml.find("ROW").each(function(index, element) 
					{
						var $Sdata = $(this);
						DataInsert += " ,{";
						$Sdata.children().each(function()
						{
							var $subData = $(this);
							var temp = $subData[0].nodeName + "";
							temp = temp.toLowerCase();
							DataInsert += ' "' + temp + '": "' + $subData.text() + '", ' ;
						});
						
						DataInsert += "}";
						
						DataInsert = DataInsert.replace(", }", "}");
						
					});
					
					DataInsert += "]";
					
					DataInsert = DataInsert.replace("[ ,{", "[{");
					$("#loadingAJAX").show();
					objDataInsert = JSON.parse(DataInsert);
					
					db.INSERT_INTO(TableName, objDataInsert);
					
					db.INSERT_INTO("ListMod", [{tablaName: TableName, neadForm: Forma, sinc: 1, formTitle: PageTitle, project_id: Project_Id, object_id: Object_Id}]);				
					$("#dMessageBDDone").show();
					
					$("#loadingAJAX").hide();
				},"xml");
				$("#dMessageNoDB").hide();
			},"xml");
		}
	}
}

function DropDataBase(name)
{
	var tablas = "LocalStorageDB-" + name + "-::tables::";
	if (window.localStorage.getItem(tablas) != undefined)
	{
		$("#ulModList").empty();
		var defDB = window.localStorage.getItem(tablas);
		
		defDB = JSON.parse(defDB);
		
		$.each(defDB,function (index, val)
		{
			var temp = "LocalStorageDB-" + name + "-" + val;
			window.localStorage.removeItem(temp);
		});
		
		window.localStorage.removeItem(tablas);
		
		CreateDB("KannelMovil");
		
		RefreshIndex();
	}
}

function testEval ()
{
	
	$("#ulSideMenu").append("<li><a href='#' onClick='FETEST()' data-rel='close' >test2</a></li>");
	$("#ulSideMenu").listview('refresh');
	;
	var stringFuntion = "function FETEST() {alert('works ' + window.sessionStorage.getItem('empresa'));}";
	
	$.globalEval(stringFuntion);
}

function BuildMantenimineto(tableName, proj_Id, obj_Id)
{
	var PK = GetPrimaryKey(tableName, proj_Id, obj_Id);
	
	var PKs = [];
	var Owhere = "{ ";
		
	$.each(PK, function (index, ele)
	{
     	var temp = window.sessionStorage.getItem(ele);
		if (temp == null)
		{
			PKs.push(ele);
		}
		else
		{
			Owhere += '"' + ele + '": ' + temp + ", ";
		}
	});
	
	Owhere += "}";
	Owhere = Owhere.replace (", }", "}");
	
	var JOwhere = JSON.parse(Owhere);
	
	window.sessionStorage.PKNext = PKs;
	
	DataGrid(tableName, proj_Id, obj_Id, JOwhere);
}

function GetPrimaryKey(tableName, proj_Id, obj_Id)
{
	var salida = [];
	
	var rsPK = db.SELECT("def_tables_movil", function (row)
	{
		var numCol = row.sql_colnum * 1;
		
		return  row.project_id == proj_Id &&
				row.object_id == obj_Id &&
				numCol > 0 &&
				row.sql_pk == 'P'
	}).ORDER_BY( 'sql_colnum ASC' );
	
	if (rsPK.length > 0)
	{
		$(rsPK).each(function(index, ele) 
		{
            var colNombre = ele.id_obj;
			colNombre = colNombre.toLowerCase();
			colNombre = colNombre.replace(tableName.toLowerCase() + "_", "");
			
			salida.push(colNombre);
			
        }); 
	}
	
	return salida;
}

function DataGrid(tableName, proj_Id, obj_Id, Owhere)
{
	
	//$("#PageBuilder_Tabla").trigger( "create" );
	$("#vc_grupos_Tabla tbody").empty();
	$("#vc_grupos_Tabla thead").empty();
	
	
	tableName = tableName.toLowerCase();
	
	var rs = db.SELECT("def_tables_movil", function (row)
	{
		var numCol = row.sql_colnum * 1;
		
		return  row.project_id == proj_Id &&
				row.object_id == obj_Id &&
				numCol > 0
	}).ORDER_BY( 'sql_colnum ASC' );
	
	if (rs.length != 0)
	{
		var $jqRS = $(rs);
		//var txtHtml = "<tr>";
		var txtHtml = "";
		$jqRS.each(function(index, ele1) 
		{
			if (ele1.sql_pk == 'P')
				txtHtml += "<th data-priority='" + (index + 1) + "' >";
			else		
				txtHtml += "<th data-priority='" + (index + 1) + "'>";
				
			txtHtml += ele1.label + "</th>";
		});
		
		//txtHtml += "</tr>";
		
		
		
		var DataRs = db.SELECT(tableName, Owhere);
		
		if (DataRs.length > 0)
		{	
			var $jqDataRS = $(DataRs);
			
			var rowCont = 0;
			var txtBody = "";
			$jqDataRS.each(function(index, element) 
			{
				rowCont++;
				txtBody += "<tr>";
				var params = '"' + tableName + '", ' + proj_Id + ", " + obj_Id + ", " + element.id;

				if (element.modifica == "1")
				    txtBody += "<td class = 'regModificado'>";
				else
				    txtBody += "<td>";

				txtBody += "<a class='btnVer ui-btn ui-shadow ui-corner-all ui-icon-action ui-btn-icon-notext ui-btn-a' data-transition='slide' href='#PageBuilder' onclick='BuildFormMobil(" + params + ")' >Ir.</a></td>";
            	$jqRS.each(function(index, ele1) 
				{
					var temp = ele1.id_obj;
					temp = temp.toLowerCase();
					temp = temp.replace (tableName + "_", "");
					
					var result = element[temp];
					
            	    //txtBody += "<td id='"+ele1.id_obj+"_row"+rowCont+"'>"+ result +"</td>";
					
					txtBody += "<td >"+ result +"</td>";					
				});  
				
				txtBody += "</tr>";
            });
			
			
				  
			$("#PageBuilder_Tabla").table(
			{
			  create: function( event, ui ) 
			  {
				  $("#PageBuilder_Tabla tr:first").append(txtHtml);
				  $("#PageBuilder_Tabla tbody").append(txtBody);
				 
				 // $("#PageBuilder_Tabla-popup-popup").css("background-color", "#d3d3d3");
			  },
			  columnPopupTheme: "a",
			  refresh: null
			});
		
			 
			 $("#PageBuilder_Tabla").table("refresh");
			 
			
		}
		else
		{
			Mensage('no data');
		}
		
		window.location = "#PageBuilder";
		$("#PageBuilder_From").hide();
		$("#PageBuilder_Tabla").show();
		$("#btnVC_Atras").hide();
	}
}

function BuildFormMobil(tableName, project_id, object_id, rowID)
{
    window.sessionStorage.setItem("#RowID", rowID);
    window.sessionStorage.setItem("#TableName", tableName);

	$("#PageBuilder_From").empty();
	
	var rs = db.SELECT("def_tables_movil", function (row)
	{
	    var numCol = row.sql_colnum * 1;

	    return row.project_id == project_id &&
				row.object_id == object_id 
	});

	var rsData = db.SELECT(tableName, { id: rowID });
	
	if (rs.length != 0)
	{
		$jqrs = $(rs);
		
		var textHtml = "";
		
		$jqrs.each(function(index, ele) 
		{
		    var tempID = ele.id_obj + "";
		    tempID = tempID.toLowerCase().replace(tableName + "_", "");

		    var InputValue = rsData[0][tempID];

		    $("#PageBuilder_From").append("<label>" + ele.label + "</label>");
		    if (ele.sql_pk == "P")
		    {
		        $("<input>").attr({ 'type': 'text', 'disabled': 'disabled', 'id': ele.id_obj, 'value': InputValue }).appendTo("#PageBuilder_From");
		        $('input').textinput();
		    }
		    else
		    {
		        switch (ele.content_type) {
		            case "D":
		                switch (ele.sql_datatype) {
		                    case "IN":
		                    case "DE":
		                        $('<input>').attr({ 'type': 'number', 'id': ele.id_obj, 'value': InputValue }).appendTo("#PageBuilder_From");
		                        $('input').textinput();
		                        break;
		                    case "VA":
		                        $('<input>').attr({ 'type': 'text', 'id': ele.id_obj, 'value': InputValue }).appendTo("#PageBuilder_From");
		                        $('input').textinput();
		                        break;
		                }
		                break;
		            case "B":
		                var tempID = "#" + ele.id_obj;
		                $("<select>").attr({ 'id': ele.id_obj }).appendTo("#PageBuilder_From");
		                $("<option>").attr({ 'value': 'Empty' }).html(ele.label).appendTo(tempID);

		                var listL_S = ele.list_labels + "";
		                var listV_S = ele.list_values + "";

		                listL = listL_S.split(",");
		                listV = listV_S.split(",");

		                $.each(listL, function (i, valor) {
		                    if (InputValue == listV[i])
		                        $("<option>").attr({ 'value': listV[i], 'selected': 'selected' }).html(valor).appendTo(tempID);
		                    else
		                        $("<option>").attr({ 'value': listV[i] }).html(valor).appendTo(tempID);
		                });

		                $('select').selectmenu();
		                break;
		            case "Q":
		                var tempID = "#" + ele.id_obj;
		                var code = ele.data_source_movil;
		                code = code.replace(/~/g, '"');
		                $.globalEval(code);
		                break;
		        }
		    }
				
		});

		var rsTabla = db.SELECT("ListMod", function (row)
		{
			return row.project_id == project_id &&
				   row.object_id == object_id
		});
		
		if (rsTabla.length != 0)
		{
			$("#lHForma").text(rsTabla[0].formTitle); 
		}
		
		
		$("#PageBuilder_From").show();
		$("#PageBuilder_Lista").hide();
		$("#btnVC_Atras").show();
	}
}

$(document).on("pagecreate", "#GridCatalog", function ()
{
	$("#FBuscarCat").show();
	$("#FGrid").hide();
	
	$("#btnFBuscar").click(function ()
	{
		var tableName = $("#tbFBuscar").val();
		
		var rs;
		
		try 
		{
			rs = db.SELECT(tableName);
		
			if (rs.length == 0)
			{
				var txtMsg = $("#lNoData").text();
				new Messi(txtMsg, 
						{
							title: 'Kannel Mobil', 
							titleClass: 'anim error', 
							buttons: 
								[
									{
										id: 0, 
										label: 'Cerrar', 
										val: 'X'
									}
								],
							modal: true,
							width: (window.innerWidth - 25)
						});
			}
			else
			{
				$("#FGrid_Tabla").empty();
				$("#FGrid_Tabla").append("<thead></thead><tbody></tbody>");
				$("#FBuscarCat").hide();
				$("#FGrid").show();
				
				$(rs).each(function(index, element) 
				{
					
                    
                });
			}
		}
		catch (err)
		{
			Mensage(err.message);
		}
	});
});

function GROUP_BY ( data, col)
{
	var groups = {};

	$.each(data, function(i, ele) 
	{
		var level = ele[col];
	
		delete ele[col];
	
		if(groups[level]) 
		{
			groups[level].push(ele);
		} else 
		{
			groups[level] = [ele];
		}
	});
	
	var result = $.map(groups, function(group, key) 
	{
		var obj = {};
		obj[key] = group;
	
		return obj;
	});
	
	return result;
}

function RefreshIndex()
{
	$("#dMessageNoDB").hide();
	$("#divUlModList").show();
	$("#btnViewCat").show();		
	$("#dMessageBDDone").hide();
			
	var rsDos = db.SELECT("Object_Det_Movil", function (row) 
	{
		return row.project_id == 58
	});
	
	if (rsDos.length > 0 )
	{
		var ModAgrupados = GROUP_BY(rsDos, "object_id");
		
		var objID = [];
		
		$.map(ModAgrupados, function (ele, index)
		{
			var key = Object.keys(ele);
			
			objID.push(key[0]);
		});
		
		var rsMods = db.SELECT("Object_Movil", function (row) 
		{
			var idStr = row.object_id + "";
			var res = objID.indexOf(idStr);
			
			return  row.project_id == 58 && 
					res > -1;
		});
		
		if (rsMods.length > 0)
		{
			$.each(rsMods, function (index, ele)
			{
				db.UPDATE("ListMod", {padre: 1}, {project_id: ele.movil_proj, object_id: ele.movil_obj});
			});
		}
		
	}
	
	var rs = db.SELECT("ListMod", function (row)
	{
		return  row.neadForm == 1 && 
				row.padre == 1 
	});
	
	if (rs.length > 0)
	{
		$("#ulModList").empty();
		$("#ulModList").listview('refresh');
		$(rs).each(function(index, element) 
		{
			var text = "'" + element.tablaName + "', " +  element.project_id + ", " + element.object_id ;
					
			$("#ulModList").append('<li><a href="#PageBuilder" id="btn'+ element.tablaName +'" onClick="BuildMantenimineto(' + text + ')">'+ element.formTitle +'</a></li>');	
		});
		$("#ulModList").listview('refresh');
	}
	else
	{
		$("#dMessageNoDB").show();
		$("#divUlModList").hide();
		
		$("#btnViewCat").hide();
	}
}

$(document).on("pagecreate", "#IndexPage", function() 
{

	if (window.sessionStorage.UserLogin)
	{
		$("#lUserEmpresa").text("Empresa: "+ window.sessionStorage.UserEmpresa);
		$("#lUserName").text("Usuario: " + window.sessionStorage.UserLogin);
		
		window.sessionStorage.setItem("empresa", window.sessionStorage.UserEmpresa);
	
		$("#dMessageNoDB").hide();
		$("#divUlModList").show();
		$("#btnViewCat").show();
		$("#dMessageBDDone").hide();
		
		$("#btnDBDown").click(function(e) 
		{
			if (window.sessionStorage.UserEmpresa)
			{
				db.TRUNCATE('Object_Movil');
				db.TRUNCATE('Object_Det_Movil');
				
				$.post(uriServer,
				{
					"cmd" : "ListModules",
					"Project": 58
				},
				function (data) 
				{
					db.INSERT_INTO("Object_Movil", data.ObjServer);
					db.INSERT_INTO("Object_Det_Movil", data.ObjDetServer);
					
					var rs = db.SELECT("Object_Movil");
				
					if (rs.length > 0)
					{
						var $jqRS = $(rs);
						
						$jqRS.each(function(index, ele) 
						{
							DownLoadDataSave(ele.movil_proj, ele.movil_obj, "empresa=" + window.sessionStorage.UserEmpresa, ele.tableName, 1, ele.formName);    
						});
					}
					
					DownLoadDataSave(55, 91, "1=1", "UNIDAD_MEDIDA", 0, "");  
					DownLoadDataSave(55, 83, " pais=" + window.sessionStorage.UserPais, "DEPARTAMENTO", 0, "");
					DownLoadDataSave(55, 84, " pais=" + window.sessionStorage.UserPais, "CIUDAD", 0, "");
					DownLoadDataSave(55, 45, "empresa=" + window.sessionStorage.UserEmpresa, "VC_VARIEDAD", 0, "");
					DownLoadDataSave(55, 48, "1=1", "VC_CERTIFICACION", 0, "");
					DownLoadDataSave(55, 100, "1=1", "VC_ACTIVIDAD_PROMOTOR", 0, "");
				},"json");

			}
			else
			{
				window.location = "#LogInDialog";
			}
		});
		
		$("#btnLoadModules").click(function(e) 
		{
         	RefreshIndex();   
        });
		
		$("#btnViewCat").click(function (e)
		{
			var txtMsg = $("#msgDropDB").text();
			new Messi(txtMsg, 
				{
					title: 'Kannel Mobil', 
					titleClass: 'anim warning', 
					buttons: 
						[
							{id: 0, label: 'Drop DB', val: 'Y', class: 'btn-danger'},
							{id: 1, label: 'Cancel', val: 'C' }
						],
					modal: true,
					width: (window.innerWidth - 25),
					callback: function(val) 
					{
						if (val == 'Y')
						 DropDataBase("KannelMovil");
					}
				});
			
		});
		
		RefreshIndex();
		
	}
	else
	{
		window.location = "#LogInDialog";
	}
});

$(document).on("pagecreate", "#PageBuilder", function ()
{
    $("#btnVC_Atras").click(function ()
    {
        $("#PageBuilder_Lista").show();
        $("#PageBuilder_From").hide();
        $("#btnVC_Atras").hide();
        window.sessionStorage.removeItem("#RowID");
        window.sessionStorage.removeItem("#TableName");
    });

    $("#btnSaveData").click(function ()
    {
        var rowID = window.sessionStorage.getItem("#RowID");
        var tableName = window.sessionStorage.getItem("#TableName");

        if (rowID != null && tableName != null)
        {
            var rs = db.SELECT("ListMod", function (row)
            {
                return row.tablaName == tableName
            });

            if (rs.length > 0)
            {
                var pID = rs[0].project_id;
                var oID = rs[0].object_id;

                var rsDef = db.SELECT("def_tables_movil", function (row)
                {
                    var numCol = row.sql_colnum * 1;

                    return row.project_id == pID &&
                            row.object_id == oID &&
                            numCol > 0
                }).ORDER_BY('sql_colnum ASC');

                var updateArray = "{";

                if (rsDef.length > 0)
                {
                    $(rsDef).each(function (index, ele)
                    {
                        var ObjID = ele.id_obj;
                        var colName = ObjID.toLowerCase().replace(tableName + "_", "");
                        
                        var InValue = $("#" + ObjID).val();

                        updateArray += '"' + colName + '": "' + InValue + '", ';
                    });

                    updateArray += "}";

                    updateArray = updateArray.replace(", }", ', "modifica": 1}');

                    db.UPDATE(tableName, JSON.parse(updateArray), { id: rowID });

                    $("#PageBuilder_Lista").show();
                    $("#PageBuilder_From").hide();
                    $("#btnVC_Atras").hide();
                    window.sessionStorage.removeItem("#RowID");
                    window.sessionStorage.removeItem("#TableName");

                    BuildMantenimineto(tableName, pID, oID);
                }


            }
        }
    });
});

