var db;

$(document).ready(function(e) 
{
	
	if (window.localStorage.getItem("LocalStorageDB-KannelMovil-::tables::") == undefined)
	{
		db = new LocalStorageDB("KannelMovil");
		db.CREATE ("def_tables_movil", 
		{
			ID: '', 
			OBJECT_ID:'', 
			LABEL: '',
			SQL_COLNAME: '',
			SQL_DATATYPE: '',
			CONTENT_TYPE: '',
			CASE_SENSITIVE: '',
			INITIAL_VALUE: '',
			LIST_LABELS: '',
			LIST_VALUES: '',
			SQL_COLNUM: 0,
			SQL_PK: ''
		});
			
		db.CREATE("movil_User", 
		{
			id: 0,
			userName: '',
			passWord: '',
			userPais: '',
			Empresa: ''
		});
		
 		db.CREATE ("ListMod", {id: 0, tablaName: '', neadForm: 0, formTitle: '', sinc: 0});
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
	
	var listaOb = ["#Texto1", "#tErrorLogin", "#tLogIn", "#tNoInternet", "#lLoading"];
		
	$("#loadingAJAX").hide();
	 
	$.each(listaOb, function (index, val )
	{
		$(val).hide();
	});  
});

function ClearForm ()
{	
	$("#vc_grupos_From").empty();
	$("#vc_grupos_Tabla").empty();
	$("#vc_grupos_Tabla").append("<thead><tr><th data-priority='0' >Ver...</th></tr></thead><tbody></tbody>");
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
	
	$.post("http://200.30.150.165:8080/webservidor2/mediador.php", 
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
	$.get("http://200.30.150.165:8080/webservidor2/mediador.php", 
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
			
	if (rs.length == 0)
	{
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
			var $xml = $(data);
						
			var DataInsert = "[";
			$xml.find("ROW").each(function(index, element) 
			{
				var $Sdata = $(this);
				if (window.localStorage.getItem("LocalStorageDB-KannelMovil-" + TableName) == undefined)
				{
					var defData = '{ "id": 0,';
					
					DataInsert += " ,{";
					$Sdata.children().each(function()
					{
						var $subData = $(this);
						defData += ' "' + $subData[0].nodeName + '": "", ' ;
						DataInsert += ' "' + $subData[0].nodeName + '": "' + $subData.text() + '", ' ;
					});
					
					defData += "}";
					DataInsert += "}";
					
					defData = defData.replace(", }", "}");
					DataInsert = DataInsert.replace(", }", "}");
					
					objdefData = JSON.parse(defData);
					
					db.CREATE(TableName, objdefData);
					
				}
				else
				{
					DataInsert += " ,{";
					$Sdata.children().each(function()
					{
						var $subData = $(this);
						DataInsert += ' "' + $subData[0].nodeName + '": "' + $subData.text() + '", ' ;
					});
					
					DataInsert += "}";
					
					DataInsert = DataInsert.replace(", }", "}");
				}
			});
			
			DataInsert += "]";
			
			DataInsert = DataInsert.replace("[ ,{", "[{");
			
			objDataInsert = JSON.parse(DataInsert);
			
			db.INSERT_INTO(TableName, objDataInsert);
			
			db.INSERT_INTO("ListMod", [{tablaName: TableName, neadForm: Forma, sinc: 1, formTitle: PageTitle}]);
			
			if (Forma == 1)
			{
				$("#ulModList").append('<li><a href="#" id="btn'+ TableName +'" onClick="alert('+ "'" +'Hola'+ "'" +')">'+ PageTitle +'</a></li>');
			
				$("#ulModList").listview('refresh');
				
				$("#loadingAJAX").show();
			}
			
			$("#loadingAJAX").hide();
		},"xml");
	}
}

$(document).on("pagecreate", "#IndexPage", function() 
{
	/*$("#btnUM").click(function () 
	{
		FormBuilder(55, 91, "", "Unidad de Medida");
	});
	
	$("#btnCV_Cal").click(function() 
	{
        FormBuilder(55, 95, " where empresa=101", "Calendario");
    });*/
	
	if (window.sessionStorage.UserLogin)
	{
	
		$("#dMessageNoDB").hide();
		$("#divUlModList").show();
		
		$("#btnDBDown").click(function(e) 
		{
			DownLoadDataSave(55, 95, " empresa=" + window.sessionStorage.UserEmpresa, "Calendario", 1, "Calendario");  
			DownLoadDataSave(55, 91, "", "UM", 0, "");  
			DownLoadDataSave(55, 83, " pais=" + window.sessionStorage.UserPais, "depto", 0, "");
			DownLoadDataSave(55, 84, " pais=" + window.sessionStorage.UserPais, "ciudad", 0, "");
			DownLoadDataSave(55, 45, " empresa=" + window.sessionStorage.UserEmpresa, "vc_variedad", 0, "");
			DownLoadDataSave(55, 48, "1=1", "vc_variedad", 0, "");
			
			
			$("#dMessageNoDB").hide();
			$("#divUlModList").show();
		});
		
		var rs = db.SELECT("ListMod", function (row)
				{
					return row.neadForm == 1
				});
		
		if (rs.length > 0)
		{
			$(rs).each(function(index, element) 
			{
			   $("#ulModList").append('<li><a href="#" id="btn'+ element.tablaName +'" onClick="alert('+ "'" +'Hola'+ "'" +')">'+ element.formTitle +'</a></li>');	
			});
			$("#ulModList").listview('refresh');
		}
		else
		{
			$("#dMessageNoDB").show();
			$("#divUlModList").hide();
		}
	
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
		title: 'Volcafe', 
		width: (window.innerWidth - 25),
		callback: function(val)
		{
			alert(val);
			$("#loadingAJAX").hide();
			$("#ajaxgif").show();
		}
	});
}

function Redirect ( x )
{
	switch (x)
	{
		case 0:
			if (!window.sessionStorage.UserLogin)
				window.location = "#page-LogIn";
			else
			{
				new Messi('&iquest;Desea Cerrar Sesi&oacute;n?', 
				{
					title: 'Shopp App', 
					width: (window.innerWidth - 25),
					buttons: 
						[
							{
								id: 0, 
								label: 'Si', 
								val: 'Y'
							}, 
							{
								id: 1, 
								label: 'No', 
								val: 'N'
							}
						], 
					callback: function(val) 
					{ 
						if (val == 'Y')
						{
							window.sessionStorage.removeItem("UserLogin");
							window.location = "index.html";
						}
					}
				});
			}
			break;
		case 1:
			window.location = "#hogar-sala";
			break;
		case 3:
			window.location = "#view-itemPagina";
			$("#VItemTitle").text('Hola');
			$("#VItemImage").attr('src','img/DB/Sala/photo2.jpg' );
			$("#VIPrice").text('Q 333');
			$("#VIDesc").text('Hola');
			break;
	}
}

function viewItemPagina( title, price, desc, urlImage )
{
	window.location = "#view-itemPagina";
	$("#VItemTitle").text(title);
	$("#VItemImage").attr('src',urlImage );
	$("#VIPrice").text(price);
	$("#VIDesc").text(desc);
}