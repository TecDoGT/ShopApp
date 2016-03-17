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
			list_labels: '',
			list_values: '',
			sql_colnum: 0,
			sql_pk: ''
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
		
 		db.CREATE ("ListMod", {id: 0, tablaName: '', neadForm: 0, formTitle: '', sinc: 0, project_id: 0, object_id: 0});
}

function FormBuilder(Project_Id, Object_Id, strWhere, PageTitle)
{
	ClearForm();
	$("#btnVC_Atras").click(function ()
	{
		$("#vc_grupos_Lista").show();
		$("#vc_grupos_From").hide();
		$("#btnVC_Atras").hide();
	});
	
	$("#lHForma").text(PageTitle);
	
	$("#vc_grupos_Lista").show();
	$("#vc_grupos_From").hide();
	$("#btnVC_Atras").hide();
	var textMsg = $("#lLoading").text();
	$("#loadingAJAX").show();
	
	$.post(uriServer, 
	{
		"cmd": "xmlDef",
		"Project"	: Project_Id,
		"Object"	: Object_Id,
		"Where"		: strWhere
	},
	function (data)
	{
		
		var $root = $(data);
			
		$root.find("ROW").each(function(index, element) 
		{
         	var $HData = $(this);
			var textTh = $HData.find("LABEL").text();
			var textHtml = "<label>" + textTh + "</label>";
			
			switch ($HData.find("CONTENT_TYPE").text())
			{
				case "D":
					switch ($HData.find("SQL_DATATYPE").text())
					{
						case "IN":
						case "DE":
							textHtml += "<div class = 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>";
							textHtml += "<input type='number' id='" + $HData.find("ID").text() + "' value='0'/>";
							textHtml += "</div>";
							break;
						case "VA":
							textHtml += "<div class = 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>";
							textHtml += "<input type='text' id='" + $HData.find("ID").text() + "' value=''/>";
							textHtml += "</div>";
							break;
						case "DA":
						case "DT":
							textHtml += "<div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset ui-input-has-clear'>";
							textHtml += "<input type='date' data-clear-btn='true' id='" + $HData.find("ID").text() + "' value=''>"
							textHtml += "<a href='#' tabindex='-1' aria-hidden='true' class='ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-input-clear-hidden' title='Clear text'>Clear text</a>"
							textHtml += "</div>";
							break;	
					}
					break;
				case "B":
					textHtml += "<div class='ui-select'>";
					textHtml += "<div id='" + $HData.find("ID").text() + "-button' class='ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow'>";
					textHtml += "<span>Seleccione Uno.</span>";
					textHtml += "<select  id='" + $HData.find("ID").text() + "'></select>";
					textHtml += "</div>";
					textHtml += "</div>";
					break;
				
			}
			
			$("#vc_grupos_From").append(textHtml);
			
			var txtHtml = "<th data-priority='" + (index + 1) + "'>";
			txtHtml += textTh;
			txtHtml += "<div class='HiddenTh'>" + $HData.find("ID").text() + "</div>";
			txtHtml += "</th>"; 
			
			$("#vc_grupos_Tabla tr:first").append(txtHtml);
			
        });
		
		$("#vc_grupos_Tabla").table( "refresh" );
		
		$("#loadingAJAX").hide();
	}, "xml");
	
	$("#loadingAJAX").show();
	$.get(uriServer, 
	{
		"cmd"		: "xmlData",
		"Project"	: Project_Id,
		"Object"	: Object_Id,
		"Where"		: strWhere
	},
	function (data)
	{
		var $xml = $(data);
			
		$xml.find("ROW").each(function(index, element) 
		{
         	var $Sdata = $(this);
			var html = "<tr>";
			
			html += "<td><a class='btnVer ui-btn ui-shadow ui-corner-all ui-icon-action ui-btn-icon-notext ui-btn-a' data-transition='slide' href='#vc_grupos'>Ir.</a></td>";
			
			$Sdata.children().each(function() 
			{
             	var $subData = $(this);
				html += "<td>" + $subData.text() + "</td>";
            });   
			html += "</tr>";
			
			$("#vc_grupos_Tabla tbody").append($(html));
        });
		
		$(".btnVer").click(function ()
		{
			var $item = $(this).closest("tr");
			var text = "";
			var ListaObj = [];
			
			$(".HiddenTh").each(function(index, element) {
                var $IdInput = $(element);
				var textID = "#" + $IdInput.text();
				
				ListaObj.push(textID);
            });
			
			$item.children().each(function(index, element) 
			{
				var $datos = $(this)
				
				if ($datos.text() != "Ver...")
					$(ListaObj[index - 1]).val($datos.text());
                
            });
			
			$("#vc_grupos_Lista").hide();
			$("#vc_grupos_From").show();
			$("#btnVC_Atras").show();
		});
		
		$("#vc_grupos_Tabla").table("refresh");
		$("#loadingAJAX").hide();
		
	}, "xml");
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
					
					if (Forma == 1)
					{
						var text = "'" + TableName + "', " +  Project_Id + ", " + Object_Id 
						$("#ulModList").append('<li><a href="#PageBuilder" id="btn'+ TableName +'" onClick="BuildFormMobil(' + text + ')">'+ PageTitle +'</a></li>');
					    $("#loadingAJAX").show();
						$("#ulModList").listview('refresh');
						
					}
					
					$("#loadingAJAX").hide();
				},"xml");
				
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
	$("#vc_grupos_Tabla").empty();
	$("#vc_grupos_Tabla").append("<thead><tr><th data-priority='0' >Ver...</th></tr></thead><tbody></tbody>");
	
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
		var DataRs = db.SELECT(tableName, Owhere);
		
		if (DataRs.length > 0)
		{	
			var $jqDataRS = $(DataRs);
			
			$jqDataRS.each(function(index, element) 
			{
            	$jqRS.each(function(index, ele1) 
				{
					
				});  
            });
			
		}
		else
		{
			alert('no data');
		}
	}
}

function BuildFormMobil(tableName, project_id, object_id)
{
	$("#vc_grupos_From").empty();
	
	var rs = db.SELECT("def_tables_movil", function (row)
	{
		var numCol = row.sql_colnum * 1;
		
		return  row.project_id == project_id &&
				row.object_id == object_id &&
				numCol > 0
	}).ORDER_BY( 'sql_colnum ASC' );
	
	if (rs.length != 0)
	{
		$jqrs = $(rs);
		
		var textHtml = "";
		
		$jqrs.each(function(index, ele) 
		{
			textHtml += "<label>" + ele.label + "</label>";
			if (ele.sql_pk == "P")
				textHtml += "";
			else
			{
				switch (ele.content_type)
				{
					case "D":
						switch (ele.sql_datatype)
						{
							case "IN":
							case "DE":
								textHtml += "<div class = 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>";
								textHtml += "<input type='number' id='" + ele.id_obj + "' value='0'/>";
								textHtml += "</div>";
								break;
							case "VA":
								textHtml += "<div class = 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>";
								textHtml += "<input type='text' id='" + ele.id_obj + "' value=''/>";
								textHtml += "</div>";
								break;
						}
						break;
				}
			}
				
        });
		
		$("#PageBuilder_From").append(textHtml);
		
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
		$("#PageBuilder_Tabla").hide();
		$("#btnVC_Atras").hide();
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

function RefreshIndex()
{
	var rs = db.SELECT("ListMod", function (row)
				{
					return row.neadForm == 1
				});
		
		if (rs.length > 0)
		{
			$("#ulModList").empty();
			$("#ulModList").listview('refresh');
			$(rs).each(function(index, element) 
			{
				var text = "'" + element.tablaName + "', " +  element.project_id + ", " + element.object_id ;
				$("#ulModList").append('<li><a href="#PageBuilder" id="btn'+ element.tablaName +'" onClick="BuildFormMobil(' + text + ')">'+ element.formTitle +'</a></li>');	
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
	
		$("#dMessageNoDB").hide();
		$("#divUlModList").show();
		$("#btnViewCat").show();
		
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
				
				
				
				
				$("#dMessageNoDB").hide();
				$("#divUlModList").show();
				$("#btnViewCat").show();
			}
			else
			{
				window.location = "#LogInDialog";
			}
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

function Mensage( texto )
{
	/*$("#loadingAJAX").show();
	$("#ajaxgif").hide();*/
	new Messi(texto, 
	{
		title: 'Kannel Mobil', 
		width: (window.innerWidth - 25),
		callback: function(val)
		{
			alert(val);
			$("#loadingAJAX").hide();
			$("#ajaxgif").show();
		}
	});
}
