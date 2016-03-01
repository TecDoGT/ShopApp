var db;

$(document).ready(function(e) 
{
	db = window.openDatabase("PromotorDirectoryDB","1.0", "LocalVolcafeDB", 2 * 1024 * 1024);    
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


$(document).on("pagebeforecreate", "#vc_grupos", function ()
{
	$("#btnVC_Atras").click(function ()
	{
		$("#vc_grupos_Lista").show();
		$("#vc_grupos_From").hide();
		$("#btnVC_Atras").hide();
	});
	
	$("#vc_grupos_Lista").show();
	$("#vc_grupos_From").hide();
	$("#btnVC_Atras").hide();
	var textMsg = $("#lLoading").text();
	$("#loadingAJAX").show();
	
	$.get("http://200.30.150.165:8080/webservidor/index.php",
	{
		"leer"	: "20"
	},
	function (data)
	{
		xml = StringToXML(data);
		root = xml.documentElement;
		
		var ListHeader = [];
		
		$(root).find("registro").each(function() 
		{
			var $Hdata = $(this);
			$Hdata.children().each(function() 
			{
            	var $subData = $(this);
				ListHeader.push($subData[0]);    
            });
			
			return false;
			
        });
		
		$.each(ListHeader, function (index, val) 
		{
			var $d = $(val);
			$("#vc_grupos_Tabla tr:first").append("<th data-priority='" + index + "'>" + $d.context.nodeName.toUpperCase() + "</th>");	
		});
		
		$(root).find("registro").each(function(index ,val)
		{
			var $datos = $(this);
			var html = "<tr>";
			html += "<td><a class='btnVer ui-btn ui-shadow ui-corner-all ui-icon-action ui-btn-icon-notext ui-btn-a' data-transition='slide' href='#vc_grupos'>Ir.</a></td>";
			$datos.children().each(function() 
			{
				var $da = $(this); 
				html += "<td>"+ $da.text() +"</td>";
            });
				
			html += "</tr>"
			
			$("#vc_grupos_Tabla tbody").append($(html));
        });
		
		$("#vc_grupos_Tabla").table( "refresh" );
		
		
		$("#loadingAJAX").hide();
		
		$(".btnVer").click(function ()
		{
			var $item = $(this).closest("tr");
			var text = "";
			$item.children().each(function(index, element) 
			{
				var $datos = $(this)
				text += "<label>" + index + "</label>";
				text += "<div class = 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>"
				text += "<input type='text' value= '" + $datos.text() + "' id = 'tbvc_grupos_" + index + "'/>";
				text += "</div>"
                
            });
			
			$("#vc_grupos_From").append(text);
			
			$("#vc_grupos_Lista").hide();
			$("#vc_grupos_From").show();
			$("#btnVC_Atras").show();
		});
		
	}, "text");
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